import admin from './admin';
import { ModuleInterface } from './interfaces/interfaces';
import landing from './public';
import provider from './provider';
import client from './client';

const modules: { [key: string]: ModuleInterface } = {};

[admin, landing, provider, client].forEach((module) => {
  modules[module.name] = module;
});

export default modules;
