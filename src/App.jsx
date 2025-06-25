import { useState } from 'react';
import './App.css'

const stored = JSON.parse(localStorage.data || '{}');

export default function App() {

  const [todos, setTodos] = useState(stored.todos || []);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState(stored.theme || 'light');
  const [completed, setCompleted] = useState(stored.completed || []);

  // todos'u çağırmak istiyorsam todos kullanıcam
  // todos'u değiştirmek istiyorsam setTodos kullanıcam

  document.body.className = theme;

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const todo = formObj.todo.trim();

    if (!todo) {
      setError('Bu todo boş eklenemez !');
      return;
      // eğer boş todo eklemeye çalıştığında buradaki return ile akış kesilir
    }

    const newTodos = [...todos, todo];
    setTodos(newTodos);
    setError('');
    localStorage.data = JSON.stringify(
      { 
        todos: newTodos, 
        theme, 
        completed 
      });
    e.target.reset();
    // form gönderildikten sonra formda kaç tane input varsa içlerini temizler

    const input = document.querySelector('input[name="todo"]');
    if (input) input.focus();

    /*
    Yarına yapılacaklar
      1- input focus -> done
      1.5 -> trim -> done 
      2- light - dark mode -> done
      3- localStorage -> done
      4- eklenen todo silme -> done
      5- complete todo butonu -> done

      6- düzenle

      Props
    */

    // console.log(formObj);
  }

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;

    localStorage.data = JSON.stringify(
      { todos, 
        theme: newTheme, 
        completed 
      });
  }

  function handleDelete(index) {
    console.log('Todo Silindi');

    const newTodos = todos.filter((_, i) => i !== index);
    // todos.filter((i) => i !== index)
    const newCompleted = completed.filter((_, i) => i !== index);

    setTodos(newTodos);
    setCompleted(newCompleted)

    localStorage.data = JSON.stringify(
      { todos: newTodos, 
        theme, 
        completed: newCompleted
      });
  }

  function handleComplete(index) {
    const newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];

    setCompleted(newCompleted);
    localStorage.data = JSON.stringify(
      { 
        todos, 
        theme, 
        completed: newCompleted
      });
  }

  return (
    <>
      {/* <NameList /> */}

      <button onClick={toggleTheme}>
        {theme === 'light' ? 'Dark Moda Geç' : 'Light Moda Geç'}
      </button>

      <h1>Todo Listesi</h1>

      <form onSubmit={handleSubmit} autoComplete='off'>
        <input type="text" name='todo' placeholder='Todo Giriniz'/>
        <button>Ekle</button>
      </form>
      
      {error && <p className='error-message'>{error}</p>}
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>
            <span className={completed[i] ? 'completed' : ''}>{todo}</span>
            <div>
              <button
                className='complete-btn'
                onClick={() => handleComplete(i)}>✅
              </button>
              <button
                className='delete-btn'
                onClick={() => handleDelete(i)}>❌
              </button>
            </div>
          </li>
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
