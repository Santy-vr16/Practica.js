document.addEventListener("DOMContentLoaded", () => {
    const formUsuario = document.getElementById("formUsuario");
    const cuerpoTabla = document.querySelector("table tbody");

    if (!formUsuario || !cuerpoTabla) {
        console.error("No se encontró el formulario #formUsuario o la tabla.");
        return;
    }

    // 2. Evento para registrar un nuevo usuario
    formUsuario.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputIdentificacion = formUsuario.querySelector("input[type='number']");
        const inputNombre = formUsuario.querySelector("input[type='text']");
        const inputCorreo = formUsuario.querySelector("input[type='email']");
        const selectRol = formUsuario.querySelector("select");

        const identificacion = inputIdentificacion.value;
        const nombre = inputNombre.value;
        const correo = inputCorreo.value;
        const rolTexto = selectRol.options[selectRol.selectedIndex].text;

        const nuevaFila = document.createElement("tr");

        // CORRECCIÓN VISUAL: Añadido text-center en la celda de identificación para centrar el número
        // Busca el paso 5 en tu script y cambia la primera celda agregando class="text-center"
        nuevaFila.innerHTML = `
    <td class="text-center" style="padding: 12px 8px; vertical-align: middle;">${identificacion}</td>
    <td style="padding: 12px 8px; vertical-align: middle;">${nombre}</td>
    <td style="padding: 12px 8px; vertical-align: middle;">${correo}</td>
    <td style="padding: 12px 8px; vertical-align: middle;">${rolTexto}</td>
    <td style="padding: 12px 8px; vertical-align: middle;">
        <button class="btn btn-sm btn-editar">
            <i class="fa-solid fa-pen" style="pointer-events: none;"></i>
        </button>
        <button class="btn btn-sm btn-eliminar ms-2">
            <i class="fa-solid fa-trash" style="pointer-events: none;"></i>
        </button>
    </td>
`;


        cuerpoTabla.insertBefore(nuevaFila, cuerpoTabla.firstChild);
        formUsuario.reset();

        const modalElemento = document.getElementById("formUsuario").closest(".modal");
        if (modalElemento) {
            const modalInstancia = bootstrap.Modal.getInstance(modalElemento) || new bootstrap.Modal(modalElemento);
            modalInstancia.hide();
        }
    });

    // Variable global temporal para saber qué fila estamos editando
    let filaAEditar = null;

    // 3. Delegación de eventos para los botones de la tabla (Eliminar y Editar)
    cuerpoTabla.addEventListener("click", (e) => {
        // ACCIÓN: ELIMINAR
        const botonEliminar = e.target.closest(".btn-eliminar");
        if (botonEliminar) {
            const filaSeleccionada = botonEliminar.closest("tr");

            Swal.fire({
                icon: "warning",
                title: "¿Eliminar usuario?",
                text: "Esta acción removerá al usuario de forma permanente",
                showCancelButton: true,
                confirmButtonColor: "#f44336",
                cancelButtonColor: "#6c757d",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    filaSeleccionada.remove();
                    Swal.fire({
                        icon: "success",
                        title: "Eliminado",
                        text: "El usuario ha sido borrado con éxito.",
                        confirmButtonColor: "#37ac1d"
                    });
                }
            });
            return;
        }

        // ACCIÓN: EDITAR
        const botonEditar = e.target.closest(".btn-editar");
        if (botonEditar) {
            filaAEditar = botonEditar.closest("tr");

            // Extraer los textos actuales de las celdas de la fila elegida
            const idActual = filaAEditar.cells[0].textContent.trim();
            const nombreActual = filaAEditar.cells[1].textContent.trim();
            const correoActual = filaAEditar.cells[2].textContent.trim();
            const rolActual = filaAEditar.cells[3].textContent.trim();

            // Cargar los textos dentro de los inputs del nuevo modal de edición
            document.getElementById("editIdentificacion").value = idActual;
            document.getElementById("editNombre").value = nombreActual;
            document.getElementById("editCorreo").value = correoActual;

            // Seleccionar el rol correspondiente en el menú desplegable
            const selectEditRol = document.getElementById("editRol");
            for (let i = 0; i < selectEditRol.options.length; i++) {
                if (selectEditRol.options[i].text === rolActual) {
                    selectEditRol.selectedIndex = i;
                    break;
                }
            }

            // Desplegar el modal de edición de forma física
            const modalEditar = new bootstrap.Modal(document.getElementById("modalEditarUsuario"));
            modalEditar.show();
        }
    });

    // 4. Guardar los cambios del formulario de edición
    const formEditarUsuario = document.getElementById("formEditarUsuario");
    if (formEditarUsuario) {
        formEditarUsuario.addEventListener("submit", (e) => {
            e.preventDefault();

            if (filaAEditar) {
                // Reemplazar el texto de las celdas por los nuevos valores digitados
                filaAEditar.cells[0].textContent = document.getElementById("editIdentificacion").value;
                filaAEditar.cells[1].textContent = document.getElementById("editNombre").value;
                filaAEditar.cells[2].textContent = document.getElementById("editCorreo").value;

                const selectEditRol = document.getElementById("editRol");
                filaAEditar.cells[3].textContent = selectEditRol.options[selectEditRol.selectedIndex].text;

                // Alerta de éxito con SweetAlert2
                Swal.fire({
                    icon: "success",
                    title: "Usuario Actualizado",
                    text: "Los cambios se guardaron correctamente.",
                    confirmButtonColor: "#37ac1d"
                });

                // Cerrar ventana flotante
                const modalInstancia = bootstrap.Modal.getInstance(document.getElementById("modalEditarUsuario"));
                modalInstancia.hide();
            }
        });
    }
});
