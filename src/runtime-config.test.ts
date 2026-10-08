import { describe, expect, it } from 'vitest';
import { parseRuntimeConfig } from './runtime-config';

const publicConfig = { apiBaseUrl: '/api', oidcAuthority: '', oidcClientId: '' };

describe('configuração pública no bootstrap', () => {
  it('aceita uma API na mesma origem e identidade desabilitada', () => {
    expect(parseRuntimeConfig(publicConfig)).toEqual(publicConfig);
  });

  it('aceita API externa e identidade completa de cliente público', () => {
    const config = {
      apiBaseUrl: 'https://api.example.org/v1',
      oidcAuthority: 'https://identity.example.org/realms/resto',
      oidcClientId: 'resto-web',
    };
    expect(parseRuntimeConfig(config)).toEqual(config);
  });

  it.each([null, {}, { ...publicConfig, apiBaseUrl: 42 }])('rejeita documento incompleto: %j', (config) => {
    expect(() => parseRuntimeConfig(config)).toThrow();
  });

  it.each(['//evil.example.org', '/\\evil.example.org', 'javascript:alert(1)',
    'https://user:password@example.org', '/api?token=secret', '/api#token'])(
  'rejeita endereço de API inseguro: %s', (apiBaseUrl) => {
    expect(() => parseRuntimeConfig({ ...publicConfig, apiBaseUrl })).toThrow();
  });

  it.each([
    { oidcAuthority: 'https://identity.example.org', oidcClientId: '' },
    { oidcAuthority: '', oidcClientId: 'resto-web' },
    { oidcAuthority: 'javascript:alert(1)', oidcClientId: 'resto-web' },
  ])('rejeita identidade incompleta ou insegura: %j', (identity) => {
    expect(() => parseRuntimeConfig({ ...publicConfig, ...identity })).toThrow();
  });

  it('não propaga campos extras para os providers', () => {
    expect(parseRuntimeConfig({ ...publicConfig, clientSecret: 'must-not-propagate' }))
      .toEqual(publicConfig);
  });
});
