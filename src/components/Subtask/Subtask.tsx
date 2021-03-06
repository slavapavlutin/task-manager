import { Keys } from '@lib';
import Button from '@local/components/Button/Button';
import Checkbox from '@local/components/Checkbox/Checkbox';
import IconSystem from '@local/components/IconSystem/IconSystem';
import Input from '@local/components/Input/Input';
import { Subtask as ISubtask } from '@local/types';
import React, { useEffect, useRef } from 'react';
import styles from './styles.css';

interface Props {
  subtask: ISubtask;
  focus?: boolean;
  onEdit?: (subtask: ISubtask) => void;
  onFocus?: (subtask: ISubtask) => void;
  onBlur?: (subtask: ISubtask) => void;
  onSubmit?: (subtask: ISubtask) => void;
  onRemove?: (subtask: ISubtask) => void;
}

function Subtask({ subtask, focus, onEdit, onFocus, onBlur, onRemove, onSubmit }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(
    () => {
      if (focus && inputRef.current) {
        inputRef.current.focus();
      }
    },
    [focus],
  );

  function handleToggle(value: boolean) {
    if (onEdit) {
      onEdit({ ...subtask, completed: value });
    }
  }

  function handleFocus() {
    if (onFocus) {
      onFocus(subtask);
    }
  }

  function handleBlur() {
    if (onBlur) {
      onBlur(subtask);
    }
  }

  function handleEdit(e: React.ChangeEvent<HTMLInputElement>) {
    if (onEdit) {
      onEdit({ ...subtask, description: e.currentTarget.value });
    }
  }

  function handleRemove() {
    if (onRemove) {
      onRemove(subtask);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const keyCode = e.keyCode || e.charCode;

    if (e.currentTarget.value === '' && keyCode === Keys.backspace) {
      handleRemove();
      return;
    }

    if (keyCode === Keys.enter && onSubmit) {
      onSubmit(subtask);
      return;
    }
  }

  return (
    <div className={styles.container}>
      <Checkbox
        value={subtask.completed}
        size={15}
        onToggle={handleToggle}
        className={styles.checkbox}
      />

      <Input
        type="text"
        className={subtask.completed ? styles.completed : styles.input}
        value={subtask.description}
        placeholder="What should be done..."
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleEdit}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        data-testid="input"
      />

      <Button onClick={handleRemove} data-testid={`remove-${subtask.id}`}>
        <IconSystem name="trashbin" size={16} className={styles.trashbin} />
      </Button>
    </div>
  );
}

export default Subtask;
