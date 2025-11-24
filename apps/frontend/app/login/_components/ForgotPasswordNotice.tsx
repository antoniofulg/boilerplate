'use client';

import { useState } from 'react';
import { Modal } from '@shared/ui';

/**
 * Forgot Password Notice Component
 * 
 * Displays informational message about password recovery
 */
export function ForgotPasswordNotice() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-sm text-primary-600 hover:text-primary-700 underline"
      >
        Esqueci a senha
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Recuperação de Senha"
      >
        <p className="text-neutral-700">
          Para recuperar sua senha, entre em contato com o administrador do sistema
          ou com a secretaria da câmara municipal.
        </p>
        <p className="text-sm text-neutral-500 mt-2">
          Esta funcionalidade estará disponível em breve.
        </p>
      </Modal>
    </>
  );
}

