import { useState } from 'react';
import './App.css'

export default function App() {

  const [todos, setTodos] = useState([]);

  // todos'u çağırmak istiyorsam todos kullanıcam
  // todos'u değiştirmek istiyorsam setTodos kullanıcam

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);

    setTodos([...todos, formObj.todo]);
    e.target.reset();
    // form gönderildikten sonra formda kaç tane input varsa içlerini temizler

    /*
    Yarına yapılacaklar
      1- input focus
      2- light - dark mode
      3- localStorage
      4- eklenen todo silme
      5- complete todo butonu
    */


    // console.log(formObj);
  }

  return (
    <>
      {/* <NameList /> */}

      <h1>Todo Listesi</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name='todo' placeholder='Todo Giriniz'/>
        <button>Ekle</button>
      </form>

      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo}</li>
        ))}
      </ul>
    </>
  )
}

/*
  fonksiyon isminin ilk harfi büyük ise "Component"
  Not -> Componentler her zaman CamelCase olarak adlandırılır

  unutmayalım ki her bir dosyada 1 tane default function olabilir

  fonksiyon isminin ilk harfi küçük ise "Normal Fonksiyon Adı"
*/

function NameList() {

  const isimler = ['Koray', 'Aleyna', 'Pınar', 'Hasan', 'Merve', 'Buğra'];
  const soyadlar = ['Kaya & Keleş', 'Akdaş', 'Düğeroğlu', 'Dertli', 'Kabakcı', 'Erdoğan'];

  const tumAd = [...isimler, ...soyadlar];
  // Burada 2 diziyi birleştirerek tek bir dizi oluşturmuş olduk

  return(
    <>
      <h2>Map örneği</h2>
      <ul>
        {isimler.map((isim, i)  => (
          <li key={i}>{isim}-{soyadlar[i]}</li>
        ))}  
        {/* {soyadlar.map((soyad, i) => (
          <li key={i}>{soyad}</li>
        ))} */}
      </ul>
    </>
  )
}
