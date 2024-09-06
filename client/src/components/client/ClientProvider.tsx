'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/app/store';
import MainLayout from '../layout/MainLayout';

const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Provider store={store}>
            <MainLayout>
                {children}
            </MainLayout>
        </Provider>
    );
};

export default ClientProvider;