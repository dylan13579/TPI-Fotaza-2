async function eliminarComentario(id, btn) {
  if (!confirm('¿Eliminar comentario?')) return;

  const res = await fetch(`/comentarios/eliminar/${id}`, {
    method: 'POST',
    credentials: 'same-origin'
  });

  const data = await res.json();

  if (data.ok) {
    btn.closest('.comment').remove();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.querySelector('.comment-form textarea');
  const form = document.querySelector('.comment-form');

  if (textarea && form) {
    textarea.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        form.submit();
      }
    });
  }
});