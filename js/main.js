// Agregar zapatos desde JSON

const zapatosContainer = document.getElementById("zapatos_container");

fetch("./data/data.json")
  .then((response) => response.json())
  .then((data) => {
    const zapatos = data.zapatos;

    zapatos.forEach((zapato) => {
      const zapatoElement = document.createElement("div");
      zapatoElement.innerHTML = `
        <div class="zapaz__cards">
            <div class="zapaz__cards--info">
                    <img src="${zapato.img}" alt="${zapato.tipo}" />
                    <h3 class="zapaz-title"> ${zapato.nombre} </h3>
                    <p class="zapaz-price">Lista: U$${zapato.precio}</p>
            </div>
            <button class="zapaz-button" data-id="${zapato.id}">Agregar a Carrito</button>
        </div>
        `;

      zapatosContainer.appendChild(zapatoElement);
      zapatosContainer.className = "zapatos_container";

      const btn = zapatosElement.querySelector(".zapaz-button");
      btn.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const index = cart.findIndex((item) => item.id === zapato.id);

        if (index >= 0) {
          cart[index].qty += 1;
        } else {
          cart.push({
            id: zapato.id,
            nombre: zapato.nombre,
            precio: zapato.precio,
            img: zapato.img,
            qty: 1,
          });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        Swal.fire({
          title: "¡Agregado al carrito!",
          text: `${zapato.nombre} fue añadido correctamente.`,
          icon: "success",
          timer: 5000,
          position: "top-end",
          toast: true,
        });
      });
    });
  })
  .catch((error) => {
    console.error("Ha ocurrido un error... " + error);
  });
