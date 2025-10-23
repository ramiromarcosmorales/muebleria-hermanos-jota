import { useState } from "react";

function ProductForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    altValue: "",
    precio: 0,
    srcImg: null,
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

  const STATUS_CLASSNAMES = {
    SUCCESS: "create-product-status success-status",
    ERROR: "create-product-status error-status",
    NO_STATUS: "",
  };

  const [status, setStatus] = useState({
    className: STATUS_CLASSNAMES.NO_STATUS,
    errorMessages: [],
  });

  // Constants for validations:
  const NAME_MIN_LENGTH = 3;
  const NAME_MAX_LENGTH = 100;
  const DESC_MIN_LENGTH = 10;
  const DESC_MAX_LENGTH = 700;
  const ALTVALUE_MIN_LENGTH = 3;
  const ALTVALUE_MAX_LENGTH = 30;
  const DIMENSIONS_MIN_LENGTH = 3;
  const DIMENSIONS_MAX_LENGTH = 50;
  const CAPACITY_MIN_LENGTH = 3;
  const CAPACITY_MAX_LENGTH = 100;
  const STYLE_MIN_LENGTH = 3;
  const STYLE_MAX_LENGTH = 100;
  const MATERIAL_MIN_LENGTH = 3;
  const MATERIAL_MAX_LENGTH = 100;
  const WARRANTY_MIN_LENGTH = 3;
  const WARRANTY_MAX_LENGTH = 100;
  const ORIGIN_MIN_LENGTH = 3;
  const ORIGIN_MAX_LENGTH = 100;
  const COLOR_MIN_LENGTH = 3;
  const COLOR_MAX_LENGTH = 100;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleFileChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prevAttributes) => ({
        ...prevAttributes,
        srcImg: e.target.files[0],
      }));
    }
  }

  function validateNombre(errors) {
    if (
      !formData.nombre ||
      formData.nombre.length < NAME_MIN_LENGTH ||
      formData.nombre.length > NAME_MAX_LENGTH
    ) {
      errors.push(
        `El nombre debe tener entre ${NAME_MIN_LENGTH} y ${NAME_MAX_LENGTH} caracteres.`
      );
    }
  }
  function validateDescripcion(errors) {
    if (
      !formData.descripcion ||
      formData.descripcion.length < DESC_MIN_LENGTH ||
      formData.descripcion.length > DESC_MAX_LENGTH
    ) {
      errors.push(
        `La descripción debe tener entre ${DESC_MIN_LENGTH} y ${DESC_MAX_LENGTH} caracteres.`
      );
    }
  }
  function validateAltValue(errors) {
    if (
      !formData.altValue ||
      formData.altValue.length < ALTVALUE_MIN_LENGTH ||
      formData.altValue.length > ALTVALUE_MAX_LENGTH
    ) {
      errors.push(
        `La descripción alt debe tener entre ${ALTVALUE_MIN_LENGTH} y ${ALTVALUE_MAX_LENGTH} caracteres.`
      );
    }
  }
  function validatePrecio(errors) {
    const precio = parseFloat(formData.precio);
    if (!formData.precio || isNaN(precio) || precio <= 0) {
      errors.push("El precio debe existir y ser mayor a 0.");
    }
  }
  function validateSrcImg(errors) {
    if (!formData.srcImg) {
      errors.push("El producto debe tener adjunta una imagen.");
    }
  }
  function validateDimensiones(errors) {
    if (
      !formData.dimensiones ||
      formData.dimensiones.length < DIMENSIONS_MIN_LENGTH ||
      formData.dimensiones.length > DIMENSIONS_MAX_LENGTH
    ) {
      errors.push(
        `Las descripción de las dimensiones debe tener entre ${DIMENSIONS_MIN_LENGTH} y ${DIMENSIONS_MAX_LENGTH} caracteres.`
      );
    }
  }
  function validateCapacidad(errors) {
    if (
      !formData.capacidad ||
      formData.capacidad.length < CAPACITY_MIN_LENGTH ||
      formData.capacidad.length > CAPACITY_MAX_LENGTH
    ) {
      errors.push(
        `Las descripción de la capacidad debe tener entre ${CAPACITY_MIN_LENGTH} y ${CAPACITY_MAX_LENGTH} caracteres.`
      );
    }
  }
  function validateEstilo(errors) {
    if (
      !formData.estilo ||
      formData.estilo.length < STYLE_MIN_LENGTH ||
      formData.estilo.length > STYLE_MAX_LENGTH
    ) {
      errors.push(
        `Las descripción del estilo debe tener entre ${STYLE_MIN_LENGTH} y ${STYLE_MAX_LENGTH} caracteres.`
      );
    }
  }
  function validateMaterial(errors) {
    if (
      !formData.material ||
      formData.material.length < MATERIAL_MIN_LENGTH ||
      formData.material.length > MATERIAL_MAX_LENGTH
    ) {
      errors.push(
        `Las descripción del material debe tener entre ${MATERIAL_MIN_LENGTH} y ${MATERIAL_MAX_LENGTH} caracteres.`
      );
    }
  }
  function validateGarantia(errors) {
    if (
      !formData.garantia ||
      formData.garantia.length < WARRANTY_MIN_LENGTH ||
      formData.garantia.length > WARRANTY_MAX_LENGTH
    ) {
      errors.push(
        `Las descripción de la garantía debe tener entre ${WARRANTY_MIN_LENGTH} y ${WARRANTY_MAX_LENGTH} caracteres.`
      );
    }
  }
  function validateOrigen(errors) {
    if (
      !formData.origen ||
      formData.origen.length < ORIGIN_MIN_LENGTH ||
      formData.origen.length > ORIGIN_MAX_LENGTH
    ) {
      errors.push(
        `Las descripción del origen debe tener entre ${ORIGIN_MIN_LENGTH} y ${ORIGIN_MAX_LENGTH} caracteres.`
      );
    }
  }
  function validatePeso(errors) {
    const peso = parseFloat(formData.peso);
    if (!formData.peso || isNaN(peso) || peso <= 0) {
      errors.push("El peso debe ser un número mayor a 0.");
    }
  }
  function validateColor(errors) {
    if (
      !formData.color ||
      formData.color.length < COLOR_MIN_LENGTH ||
      formData.color.length > COLOR_MAX_LENGTH
    ) {
      errors.push(
        `Las descripción del color debe tener entre ${COLOR_MIN_LENGTH} y ${COLOR_MAX_LENGTH} caracteres.`
      );
    }
  }

  function validateForm() {
    const errors = [];

    validateNombre(errors);
    validateDescripcion(errors);
    validateAltValue(errors);
    validatePrecio(errors);
    validateSrcImg(errors);
    validateDimensiones(errors);
    validateCapacidad(errors);
    validateEstilo(errors);
    validateMaterial(errors);
    validateGarantia(errors);
    validateOrigen(errors);
    validatePeso(errors);
    validateColor(errors);

    return errors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = validateForm();

    if (errors.length > 0) {
      setStatus({
        errorMessages: errors,
        className: STATUS_CLASSNAMES.ERROR,
      });
      return;
    }

    setStatus((prevAttributes) => ({
      ...prevAttributes,
      className: STATUS_CLASSNAMES.SUCCESS,
    }));
    console.log(formData);
  }

  function displaySuccess() {
    return (
      <div className={STATUS_CLASSNAMES.SUCCESS}>
        <p>Formulario enviado exitosamente.</p>
      </div>
    );
  }

  function displayErrors() {
    return (
      <div className={STATUS_CLASSNAMES.ERROR}>
        <p>No se pudo enviar el formulario por los siguientes errores:</p>
        <ul>
          {status.errorMessages.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </div>
    );
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
              minLength={NAME_MIN_LENGTH}
              maxLength={NAME_MAX_LENGTH}
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
              minLength={DESC_MIN_LENGTH}
              maxLength={DESC_MAX_LENGTH}
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
              minLength={ALTVALUE_MIN_LENGTH}
              maxLength={ALTVALUE_MAX_LENGTH}
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
              step="0.01"
              minLength="0"
              placeholder="0,00"
            />
          </div>

          <div className="create-product-field">
            <label htmlFor="imagenProducto">Imagen</label>
            <input
              type="file"
              id="imagenProducto"
              name="srcImg"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="create-product-field">
            <label htmlFor="destacadoProducto">¿Destacar producto?</label>
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
              minLength={DIMENSIONS_MIN_LENGTH}
              maxLength={DIMENSIONS_MAX_LENGTH}
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
              minLength={CAPACITY_MIN_LENGTH}
              maxLength={CAPACITY_MAX_LENGTH}
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
              minLength={STYLE_MIN_LENGTH}
              maxLength={STYLE_MAX_LENGTH}
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
              minLength={MATERIAL_MIN_LENGTH}
              maxLength={MATERIAL_MAX_LENGTH}
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
              minLength={WARRANTY_MIN_LENGTH}
              maxLength={WARRANTY_MAX_LENGTH}
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
              minLength={ORIGIN_MIN_LENGTH}
              maxLength={ORIGIN_MAX_LENGTH}
            />
          </div>

          <div className="create-product-field">
            <label htmlFor="pesoProducto">Peso</label>
            <input
              type="number"
              id="pesoProducto"
              name="peso"
              placeholder="0,00"
              value={formData.peso}
              onChange={handleChange}
              min="0"
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
              minLength={COLOR_MIN_LENGTH}
              maxLength={COLOR_MAX_LENGTH}
            />
          </div>

          {status.className === STATUS_CLASSNAMES.SUCCESS && displaySuccess()}
          {status.className === STATUS_CLASSNAMES.ERROR &&
            status.errorMessages &&
            displayErrors()}

          <button type="submit" className="create-product-button">
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
}

export default ProductForm;
