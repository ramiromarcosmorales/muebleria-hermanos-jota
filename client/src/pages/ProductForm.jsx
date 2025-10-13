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
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <>
      <h1>Crear producto</h1>
      <form noValidate onSubmit={handleSubmit}>
        <label htmlFor="nombreProducto">Nombre</label>
        <input
          type="text"
          id="nombreProducto"
          name="nombre"
          placeholder="Nombre del producto"
          value={formData.nombre}
          onChange={handleChange}
        />

        <label htmlFor="descripcionProducto">Descripción</label>
        <input
          type="text"
          id="descripcionProducto"
          name="descripcion"
          placeholder="Descripción del producto"
          value={formData.descripcion}
          onChange={handleChange}
        />

        <label htmlFor="descripcionAltProducto">Descripción alt</label>
        <input
          type="text"
          id="descripcionAltProducto"
          name="altValue"
          placeholder="Descripción del alt"
          value={formData.altValue}
          onChange={handleChange}
        />

        <label htmlFor="precioProducto">Precio</label>
        <input
          type="number"
          id="precioProducto"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
        />

        <label htmlFor="imagenProducto">Imagen</label>
        <input
          type="image"
          id="imagenProducto"
          name="srcImg"
          value={formData.srcImg}
          onChange={handleChange}
        />

        <label htmlFor="destacadoProducto">Destacado</label>
        <input
          type="checkbox"
          id="destacadoProducto"
          name="destacado"
          value={formData.destacado}
          onChange={handleChange}
        />

        <label htmlFor="dimensionesProducto">Dimensiones</label>
        <input
          type="text"
          id="dimensionesProducto"
          name="dimensiones"
          placeholder="Dimensiones del producto"
          value={formData.dimensiones}
          onChange={handleChange}
        />

        <label htmlFor="capacidadProducto">Capacidad</label>
        <input
          type="text"
          id="capacidadProducto"
          name="capacidad"
          placeholder="Capacidad del producto"
          value={formData.capacidad}
          onChange={handleChange}
        />

        <label htmlFor="estiloProducto">Estilo</label>
        <input
          type="text"
          id="estiloProducto"
          name="estilo"
          placeholder="Estilo del producto"
          value={formData.estilo}
          onChange={handleChange}
        />

        <label htmlFor="materialProducto">Material</label>
        <input
          type="text"
          id="materialProducto"
          name="material"
          placeholder="Material del producto"
          value={formData.material}
          onChange={handleChange}
        />

        <label htmlFor="garantiaProducto">Garantía</label>
        <input
          type="text"
          id="garantiaProducto"
          name="garantia"
          placeholder="Garantía del producto"
          value={formData.garantia}
          onChange={handleChange}
        />

        <label htmlFor="origenProducto">Origen</label>
        <input
          type="text"
          id="origenProducto"
          name="origen"
          placeholder="Origen del producto"
          value={formData.origen}
          onChange={handleChange}
        />

        <label htmlFor="pesoProducto">Peso</label>
        <input
          type="text"
          id="pesoProducto"
          name="peso"
          placeholder="Peso del producto"
          value={formData.peso}
          onChange={handleChange}
        />

        <label htmlFor="colorProducto">Color</label>
        <input
          type="text"
          id="colorProducto"
          name="color"
          placeholder="Color del producto"
          value={formData.color}
          onChange={handleChange}
        />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default ProductForm;
