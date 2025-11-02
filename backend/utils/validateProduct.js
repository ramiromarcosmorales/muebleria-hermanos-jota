export function validateProduct(product) {
  const errors = [];

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

  if (
    !product.nombre ||
    product.nombre.length < NAME_MIN_LENGTH ||
    product.nombre.length > NAME_MAX_LENGTH
  ) {
    errors.push(
      `El nombre debe tener entre ${NAME_MIN_LENGTH} y ${NAME_MAX_LENGTH} caracteres.`
    );
  }

  if (
    !product.descripcion ||
    product.descripcion.length < DESC_MIN_LENGTH ||
    product.descripcion.length > DESC_MAX_LENGTH
  ) {
    errors.push(
      `La descripción debe tener entre ${DESC_MIN_LENGTH} y ${DESC_MAX_LENGTH} caracteres.`
    );
  }

  if (
    !product.altValue ||
    product.altValue.length < ALTVALUE_MIN_LENGTH ||
    product.altValue.length > ALTVALUE_MAX_LENGTH
  ) {
    errors.push(
      `La descripción alt debe tener entre ${ALTVALUE_MIN_LENGTH} y ${ALTVALUE_MAX_LENGTH} caracteres.`
    );
  }

  const precio = parseFloat(product.precio);
  if (!product.precio || isNaN(precio) || precio <= 0) {
    errors.push("El precio debe ser un número mayor a 0.");
  }

  if (!product.imagenUrl) {
    errors.push("El producto debe tener adjunta una imagen.");
  }

  if (
    !product.dimensiones ||
    product.dimensiones.length < DIMENSIONS_MIN_LENGTH ||
    product.dimensiones.length > DIMENSIONS_MAX_LENGTH
  ) {
    errors.push(
      `Las descripción de las dimensiones debe tener entre ${DIMENSIONS_MIN_LENGTH} y ${DIMENSIONS_MAX_LENGTH} caracteres.`
    );
  }

  if (
    !product.capacidad ||
    product.capacidad.length < CAPACITY_MIN_LENGTH ||
    product.capacidad.length > CAPACITY_MAX_LENGTH
  ) {
    errors.push(
      `Las descripción de la capacidad debe tener entre ${CAPACITY_MIN_LENGTH} y ${CAPACITY_MAX_LENGTH} caracteres.`
    );
  }

  if (
    !product.estilo ||
    product.estilo.length < STYLE_MIN_LENGTH ||
    product.estilo.length > STYLE_MAX_LENGTH
  ) {
    errors.push(
      `Las descripción del estilo debe tener entre ${STYLE_MIN_LENGTH} y ${STYLE_MAX_LENGTH} caracteres.`
    );
  }

  if (
    !product.material ||
    product.material.length < MATERIAL_MIN_LENGTH ||
    product.material.length > MATERIAL_MAX_LENGTH
  ) {
    errors.push(
      `Las descripción del material debe tener entre ${MATERIAL_MIN_LENGTH} y ${MATERIAL_MAX_LENGTH} caracteres.`
    );
  }

  if (
    !product.garantia ||
    product.garantia.length < WARRANTY_MIN_LENGTH ||
    product.garantia.length > WARRANTY_MAX_LENGTH
  ) {
    errors.push(
      `Las descripción de la garantía debe tener entre ${WARRANTY_MIN_LENGTH} y ${WARRANTY_MAX_LENGTH} caracteres.`
    );
  }

  if (
    !product.origen ||
    product.origen.length < ORIGIN_MIN_LENGTH ||
    product.origen.length > ORIGIN_MAX_LENGTH
  ) {
    errors.push(
      `Las descripción del origen debe tener entre ${ORIGIN_MIN_LENGTH} y ${ORIGIN_MAX_LENGTH} caracteres.`
    );
  }

  const peso = parseFloat(product.peso);
  if (!product.peso || isNaN(peso) || peso <= 0) {
    errors.push("El peso debe ser un número mayor a 0.");
  }

  if (
    !product.color ||
    product.color.length < COLOR_MIN_LENGTH ||
    product.color.length > COLOR_MAX_LENGTH
  ) {
    errors.push(
      `Las descripción del color debe tener entre ${COLOR_MIN_LENGTH} y ${COLOR_MAX_LENGTH} caracteres.`
    );
  }

  return errors;
}
