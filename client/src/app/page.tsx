'use client'
import MainLayout from "@/components/layout/MainLayout";
import { store } from "@/redux/app/store";
import { Provider } from "react-redux";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';
export default function Home() {
  return (
    <Provider store={store}>
      <ToastContainer theme="white"/>
      <MainLayout>
        <div>conten</div>
      </MainLayout>
    </Provider>
  );
}
