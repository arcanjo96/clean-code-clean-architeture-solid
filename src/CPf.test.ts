import { Cpf } from "./Cpf";

describe('Cpf Tests', () => {
    const moccksCpf = {
        cpfInvalid: '12345678901',
        cpfInvalidLength: '1234567890123',
        cpfRepeteadCharacters: '11111111111',
        cpfValid: '206.161.530-90',
        cpfValidWithSpecialCharacters: '906.576.760-63'
    };
    it('should be able return false if cpf is not provided', () => {
        const cpf = new Cpf('');
        const isValid = cpf.validate();
        expect(isValid).toBeFalsy();
    });
    it('should be able return false if cpf has invalid length', () => {
        const cpf = new Cpf(moccksCpf.cpfInvalidLength);
        const isValid = cpf.validate();
        expect(isValid).toBeFalsy();
    });
    it('should be able return false if cpf has repetead characters', () => {
        const cpf = new Cpf(moccksCpf.cpfRepeteadCharacters);
        const isValid = cpf.validate();
        expect(isValid).toBeFalsy();
    });
    it('should be able return true if cpf is valid', () => {
        const cpf = new Cpf(moccksCpf.cpfValid);
        const isValid = cpf.validate();
        expect(isValid).toBeTruthy();
    });
    it('should be able return true if cpf with special characters is valid', () => {
        const cpf = new Cpf(moccksCpf.cpfValidWithSpecialCharacters);
        const isValid = cpf.validate();
        expect(isValid).toBeTruthy();
    });
});