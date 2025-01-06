import classNames from 'classnames';

export function sendErrorMessage(
  errorText: string,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
) {
  setErrorMessage(errorText);
  setTimeout(() => {
    setErrorMessage('');
  }, 3000);
}

type Props = {
  message: string;
  removeMessage: () => void;
};

export const ErrorMessage: React.FC<Props> = ({ message, removeMessage }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !message },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={removeMessage}
      />
      {message}
    </div>
  );
};
