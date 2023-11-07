import React, { useState } from 'react';
import { Container} from '@mui/material';
import ItemForm from './ItemForm'; // ItemFormコンポーネントをインポート
import { fireAuth } from '../../Auth/firebase';

interface AddItemFormProps {
  onFormSubmitSuccess: () => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onFormSubmitSuccess }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [chapter, setChapter] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const user = fireAuth.currentUser;

    if (user) {
      const userEmail = user.email;

      const data = {
        title,
        content,
        category,
        chapter,
        file,
        createdBy: userEmail,
        createdByName: userEmail,
      };

      try {
        const response = await fetch('https://uttc-hackathon-be-agfjgti4cq-uc.a.run.app/api/addItem', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('データが送信されました:', responseData);
          onFormSubmitSuccess();
        } else {
          setErrorMessage('データの送信に失敗しました');
          console.error('エラー:', response.statusText);
        }
      } catch (error) {
        setErrorMessage('エラーが発生しました');
        console.error('エラー:', error);
      }
    } else {
      setErrorMessage('ユーザーがサインインしていません');
      console.error('ユーザーがサインインしていません');
    }
  };

  return (
    <Container>
      
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <ItemForm
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          category={category}
          setCategory={setCategory}
          chapter={chapter}
          setChapter={setChapter}
          file={file}
          setFile={setFile}
          errorMessage={errorMessage}
          onSubmit={handleSubmit}
        />
      
    </Container>
  );
}

export default AddItemForm;