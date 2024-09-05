'use client'
import MainLayout from "@/components/layout/MainLayout";
import { store } from "@/redux/app/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <MainLayout>
        <div>conten</div>
      </MainLayout>
    </Provider>
  );
}
