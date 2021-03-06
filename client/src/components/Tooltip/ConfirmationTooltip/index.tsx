import React from 'react';
import Tooltip, { Props as TooltipProps } from 'src/components/Tooltip';
import Button from 'src/components/Button';
import styled from 'styled-components';

const ExtendedTooltip = styled(Tooltip)`
  white-space: nowrap;
  padding-left: 8px;
  padding-right: 8px;
`;

const ExtendedButton = styled(Button)`
  margin: 0 4px;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

type Props = TooltipProps & {
  onCancel: () => void;
  onConfirm: () => void;
  cancelText?: string;
  confirmText?: string;
};

const ConfirmationTooltip: React.FC<Props> = ({
  isVisible,
  direction,
  onCancel,
  onConfirm,
  cancelText = 'Нет',
  confirmText = 'Да',
}) => {
  return (
    <ExtendedTooltip isVisible={isVisible} direction={direction}>
      <ExtendedButton onClick={onCancel} icon="cancel">
        {cancelText}
      </ExtendedButton>
      <ExtendedButton onClick={onConfirm} icon="confirm">
        {confirmText}
      </ExtendedButton>
    </ExtendedTooltip>
  );
};

export default ConfirmationTooltip;
