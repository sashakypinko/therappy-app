import { type AppState } from './rootReducer';

export const selectAuth = (state: AppState): App.Store.Auth => state.auth;
export const selectServices = (state: AppState): App.Store.Services => state.services;
export const selectUsers = (state: AppState): App.Store.Users => state.users;
export const selectProviders = (state: AppState): App.Store.Providers => state.providers;

export const selectClients = (state: AppState): App.Store.Clients => state.clients;
export const selectAppointments = (state: AppState): App.Store.Appointments => state.appointments;

export const selectSuccessSnackbar = (state: AppState): string => state.ui.successSnackbar;
export const selectErrorSnackbar = (state: AppState): string => state.ui.errorSnackbar;
export const selectInfoSnackbar = (state: AppState): string => state.ui.infoSnackbar;
