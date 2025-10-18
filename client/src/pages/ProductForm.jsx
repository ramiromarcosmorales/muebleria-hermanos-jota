import { useState } from "react";

function ProductForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    altValue: "",
    precio: 0,
    srcImg: "",
    destacado: false,
    dimensiones: "",
    capacidad: "",
    estilo: "",
    material: "",
    garantia: "",
    origen: "",
    peso: "",
    color: "",
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <section className="create-product">
      <div className="create-product-container">
        <header className="create-product-header">
          <h1>Crear producto</h1>
          <p>Rellena el formulario y pulsa enviar para añadir un producto.</p>
        </header>

        <form
          className="create-product-form"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="create-product-field">
            <label htmlFor="nombreProducto">Nombre</label>
            <input
              type="text"
              id="nombreProducto"
              name="nombre"
              placeholder="Nombre del producto"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>

          <div className="create-product-field">
            <label htmlFor="descripcionProducto">Descripción</label>
            <input
              type="text"
              id="descripcionProducto"
              name="descripcion"
              placeholder="Descripción del producto"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </div>

          <div className="create-product-field">
            <label htmlFor="descripcionAltProducto">Descripción alt</label>
            <input
              type="text"
              id="descripcionAltProducto"
              name="altValue"
              placeholder="Descripción del alt"
              value={formData.altValue}
              onChange={handleChange}
            />
          </div>

          <div className="create-product-field">
            <label htmlFor="precioProducto">Precio</label>
            <input
              type="number"
              id="precioProducto"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
            />
          </div>

          <div className="create-product-field">
            <label htmlFor="imagenProducto">Imagen</label>
            <input
              type="file"
              id="imagenProducto"
              name="srcImg"
              onChange={handleChange}
            />
          </div>

          <div className="create-product-field">
            <label htmlFor="destacadoProducto">Destacado</label>
            <input
              type="checkbox"
              id="destacadoProducto"
              name="destacado"
              checked={formData.destacado}
              onChange={handleChange}
            />
          </div>

          <div className="create-product-field">
            <label htmlFor="dimensionesProducto">Dimensiones</label>
            <input
              type="text"
              id="dimensionesProducto"
              name="dimensiones"
              placeholder="Dimensiones del producto"
              value={formData.dimensiones}
              onChange={handleChange}
            />
          </div>

          <div className="create-product-field">
            <label htmlFor="capacidadProducto">Capacidad</label>
            <input
              type="text"
              id="capacidadProducto"
              name="capacidad"
              placeholder="Capacidad del producto"
              value={formData.capacidad}
              onChange={handleChange}
            />
          </div>

          <div className="create-product-field">
            <label htmlFor="estiloProducto">Estilo</label>
            <input
              type="text"
              id="estiloProducto"
              name="estilo"
              placeholder="Estilo del producto"
              value={formData.estilo}
              onChange={handleChange}
            />
          </div>

          <div className="create-product-field">
            <label htmlFor="materialProducto">Material</label>
            <input
              type="text"
              id="materialProducto"
              name="material"
              placeholder="Material del producto"
              value={formData.material}
              onChange={handleChange}
            />
          </div>

          <div className="create-product-field">
            <label htmlFor="garantiaProducto">Garantía</label>
            <input
              type="text"
              id="garantiaProducto"
              name="garantia"
              placeholder="Garantía del producto"
              value={formData.garantia}
              onChange={handleChange}
            />
          </div>

          <div className="create-product-field">
            <label htmlFor="origenProducto">Origen</label>
            <input
              type="text"
              id="origenProducto"
              name="origen"
              placeholder="Origen del producto"
              value={formData.origen}
              onChange={handleChange}
            />
          </div>

          <div className="create-product-field">
            <label htmlFor="pesoProducto">Peso</label>
            <input
              type="text"
              id="pesoProducto"
              name="peso"
              placeholder="Peso del producto"
              value={formData.peso}
              onChange={handleChange}
            />
          </div>

          <div className="create-product-field">
            <label htmlFor="colorProducto">Color</label>
            <input
              type="text"
              id="colorProducto"
              name="color"
              placeholder="Color del producto"
              value={formData.color}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="create-product-button">
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
}

export default ProductForm;
