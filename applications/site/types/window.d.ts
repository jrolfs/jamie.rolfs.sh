import { Configuration } from '../src/configuration';

declare global {
  interface Window {
    configuration: Configuration;
  }
}
