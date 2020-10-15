const Modal = (function () {
  const { modal, startNewGameButton } = DOMContent;
  const { preventFocusLose } = Focus;

  const showMessage = (heading, message) => {
    modal.querySelector('.modal-heading').innerHTML = heading;
    modal.querySelector('.modal-text').innerHTML = message;

    modal.showModal();
    startNewGameButton.focus();
    preventFocusLose(); // TODO block all focus changes
  };

  const hideModal = () => {
    modal.close();
  };

  return { showMessage, hideModal };
})();
