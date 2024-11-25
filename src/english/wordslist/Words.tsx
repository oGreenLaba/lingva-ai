import React, { useEffect, useRef, useState } from 'react';
import { Article, TypeTitle, WordsBlock } from "../../styles/BlockStyles";
import { S } from '../English_Styles';
import { useToggleArray } from "../en-components/logics/useToggleArray";
import { useWordTest } from "../en-components/logics/useWordTest";
import { FlexWrapper } from "../../components/FlexWrapper";
import { Button } from "../en-components/button/Button";
import { WrappButton } from "../wrapper/WrappButton";
import { useSwapWords } from "../en-components/logics/useSwapWords";
import { getWords } from '../../services/apiService';
import {categoriesData} from "../en-components/data/categoriesData";

// Определяем тип для слов
type Word = {
    eng: string;
    rus: string;
};

type WordListProps = {
    categoryKey: keyof typeof categoriesData;
    title: string;
}

export const Words = ({ categoryKey, title }: WordListProps) => {
    const [categoryWords, setCategoryWords] = useState<Word[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Добавлена ссылка для управления фокусом на поле ввода
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        // Функция для загрузки данных
        const fetchData = async () => {
            try {
                const data = await getWords(); // Загружаем данные с сервера
                setCategoryWords(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching words:', error);
                setError(error as Error);
                setLoading(false);
            }
        };

        fetchData();
    }, [categoryKey]);

    const { array: words, toggleArray } = useToggleArray<Word>(categoryWords);
    const {
        isSingleWordMode, toggleMode, currentWord, inputValue,
        setInputValue, isCorrect, handleNextWord, handleCheckTranslation
    } = useWordTest(words);

    const { isSwapped, toggleSwap } = useSwapWords();

    // Добавлен эффект для установки фокуса на поле ввода при переходе к следующему слову
    useEffect(() => {
        if (!isCorrect && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isCorrect, currentWord]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading words. Please try again later.</div>;
    }

    return (
        <WordsBlock>
            <TypeTitle>{title}</TypeTitle>
            <Article>
                <FlexWrapper gap={'20px'} margin={'0 0 20px 0'} justify={'end'} position={'relative'}>
                    <Button onClick={toggleArray} iconId={'random'} />
                    <Button onClick={toggleMode} iconId={isSingleWordMode ? "back" : "englishWord"} />
                    <WrappButton />
                    <Button onClick={toggleSwap} iconId={'arrows'} />
                </FlexWrapper>

                {isSingleWordMode ? (
                    <div>
                        <S.TextWrapper>
                            {isSwapped ? (
                                <S.EngWord>{currentWord?.rus}</S.EngWord>
                            ) : (
                                <S.EngWord>{currentWord?.eng}</S.EngWord>
                            )}
                            {isCorrect ? (
                                isSwapped ? (
                                    <S.RusWord>{currentWord?.eng}</S.RusWord>
                                ) : (
                                    <S.RusWord>{currentWord?.rus}</S.RusWord>
                                )
                            ) : (
                                <S.Input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Введите перевод"
                                />
                            )}
                        </S.TextWrapper>

                        <FlexWrapper justify={'end'} margin={'20px 0 0 0'}>
                            {!isCorrect ? (
                                <Button onClick={handleCheckTranslation} title="Проверить" />
                            ) : (
                                <Button onClick={handleNextWord} title="Следующее слово" />
                            )}
                        </FlexWrapper>
                    </div>
                ) : (
                    words.map((word, index) => (
                        <S.TextWrapper key={index}>
                            {isSwapped ? (
                                <>
                                    <S.EngWord>{word.rus}</S.EngWord>
                                    <S.RusWord>{word.eng}</S.RusWord>
                                </>
                            ) : (
                                <>
                                    <S.EngWord>{word.eng}</S.EngWord>
                                    <S.RusWord>{word.rus}</S.RusWord>
                                </>
                            )}
                        </S.TextWrapper>
                    ))
                )}
            </Article>
        </WordsBlock>
    );
};


