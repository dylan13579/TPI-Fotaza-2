async function eliminarComentario(id, btn) {
  if (!confirm('¿Eliminar comentario?')) return;

  try {
    const res = await fetch(`/comentarios/eliminar/${id}`, {
      method: 'POST',
      credentials: 'same-origin'
    });

    const data = await res.json();

    if (data.ok) {
      btn.closest('.comment').remove();
    }
  } catch (error) {
    console.error('Error eliminando comentario:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.querySelector('.comment-form textarea');
  const form = document.querySelector('.comment-form');

  if (!textarea || !form) return;

  textarea.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.submit();
    }
  });

  textarea.addEventListener('input', function () {
    this.style.height = '40px'; // reset
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
  });
});