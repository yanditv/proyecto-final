const { validateCedula } = require("../src/utils/cedulaValidator");

describe("Validación de cédula ecuatoriana", () => {
    it("Debe retornar false si la cédula no tiene 10 dígitos", () => {
        expect(validateCedula("12345")).toBe(false);
        expect(validateCedula("12345678901")).toBe(false);
    });

    it("Debe retornar false si la cédula contiene caracteres no numéricos", () => {
        expect(validateCedula("abcdefghij")).toBe(false);
        expect(validateCedula("12345abcd6")).toBe(false);
    });

    it("Debe retornar false si la cédula tiene una provincia inválida", () => {
        expect(validateCedula("0034567890")).toBe(false); // Provincia 00 no existe
        expect(validateCedula("2534567890")).toBe(false); // Provincia 25 no existe
    });

    it("Debe retornar false si el tercer dígito no está en el rango permitido", () => {
        expect(validateCedula("1164567890")).toBe(false); // Tercer dígito >= 6 no permitido
    });

    it("Debe retornar false si el dígito verificador no es correcto", () => {
        expect(validateCedula("1104680131")).toBe(false); // Cédula con dígito verificador incorrecto
    });

    it("Debe retornar true si la cédula es válida", () => {
        expect(validateCedula("1900896968")).toBe(true); // Ejemplo de cédula válida
    });
});
