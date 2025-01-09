exports.validateCedula = (cedula) => {
    if (!/^\d{10}$/.test(cedula)) return false;

    const digitos = cedula.split("").map(Number);
    const codigoProvincia = parseInt(cedula.substring(0, 2), 10);
    const tercerDigito = digitos[2];

    if (codigoProvincia < 1 || codigoProvincia > 24 || tercerDigito >= 6) return false;

    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;

    for (let i = 0; i < coeficientes.length; i++) {
        let producto = digitos[i] * coeficientes[i];
        suma += producto >= 10 ? producto - 9 : producto;
    }

    const digitoVerificador = (10 - (suma % 10)) % 10;

    return digitoVerificador === digitos[9];
};
