
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import ButtonApp from './component/ButtonApp';
import React, { useState } from 'react';
export default function App() {
  const [them, setThem] = useState(false)
  const mode = them === false ? styles.DaskMode : styles.LightMode
  const TextColor = them === false ? styles.TextLight : styles.TextDask

  const [result, setResult] = useState("");
  const [query, setQuery] = useState("0");

  // number button click handler
  const numberClick = (number) => {
    if (query === '0' && number === '0') return;
    if (query === '0' && number === '00') return;

    if (query === '0' && number !== '0') setQuery(number);
    else setQuery(query + number);
  };

  // operation button click handler
  const operationClick = (operation) => {
    if (query === '0' || query === '00') return;

    if (query[query.length - 1] === '+' || query[query.length - 1] === '-' ||
      query[query.length - 1] === '*' || query[query.length - 1] === '/' || query[query.length - 1] === '.') {
      let queryStr = query;
      queryStr = queryStr.substring(0, queryStr.length - 1);
      setQuery(queryStr + operation);
    } else setQuery(query + operation);
  };

  // clear button click handler
  const clearClick = () => {
    setQuery("0");
    setResult("");
  };

  // equals click handler on the basis of query
  const equalsClick = () => {
    // get complete query with numbers and operations
    let queryStr = query;

    // split query string into array of numbers and operations
    let queryArr = queryStr.split(/(\+|\-|\*|\/)/);

    // loop through the array and perform operations
    let result = 0;
    let operation = '+';
    for (let i = 0; i < queryArr.length; i++) {
      let item = queryArr[i];
      if (item === '+' || item === '-' || item === '*' || item === '/') {
        operation = item;
      } else {
        switch (operation) {
          case '+':
            result += parseFloat(item);
            break;
          case '-':
            result -= parseFloat(item);
            break;
          case '*':
            result *= parseFloat(item);
            break;
          case '/':
            result /= parseFloat(item);
            break;
        }
      }
    }
    setResult(result);
  };

  // delete button click handler
  const deleteClick = () => {
    let queryStr = query;
    if (queryStr.length === 1) {
      setQuery('0');
    } else {
      queryStr = queryStr.substring(0, queryStr.length - 1);
      setQuery(queryStr);
    }
  };

  const handlePoint = () => {
    if (query === '0' || query === '00') return;
    if (query[query.length - 1] === '.') return;
    if (query[query.length - 1] === '+' || query[query.length - 1] === '-' || query[query.length - 1] === '*' || query[query.length - 1] === '/') {
      setQuery(query + '0.');
    } else {
      // check if there is already a point in the number
      let queryStr = query;
      let queryArr = queryStr.split(/(\+|\-|\*|\/)/);
      let lastNumber = queryArr[queryArr.length - 1];
      if (lastNumber.indexOf('.') !== -1) return;
      setQuery(query + '.');
    }
  };

  const handlePercentage = () => {
    if (query === '0' || query === '00') return;
    if (query[query.length - 1] === '+' || query[query.length - 1] === '-' || query[query.length - 1] === '*' || query[query.length - 1] === '/') {
      setQuery(query + '0%');
    } else {
      // check if there is already a point in the number  
      let queryStr = query;
      let queryArr = queryStr.split(/(\+|\-|\*|\/)/);
      let lastNumber = queryArr[queryArr.length - 1];
      if (lastNumber.indexOf('%') !== -1) return;
      setQuery(query + '%');
      setResult(query / 100);
    }
  };

  return (
    <View style={[styles.container, mode]}>
      <TouchableOpacity style={styles.image}
        onPress={() => {
          them ? setThem(false) : setThem(true)
        }}
      >
        {
          them === true ?
            <Image style={{ width: 50, height: 50, borderRadius: 44 }} source={require('./image/daskMode.jpg')} />
            :
            <Image style={{ width: 50, height: 50, borderRadius: 44 }} source={require('./image/Sun.png')} />
        }
      </TouchableOpacity>
      <View style={styles.display}>
        <Text style={[styles.query, TextColor]}>{query}</Text>
        <br />
        <Text style={[styles.results, TextColor]}>{result}</Text>
      </View>
      <View style={styles.keyboard}>
        <View style={styles.btnRow}>
          <ButtonApp title="C" onPress={() => clearClick()} />
          <ButtonApp title="DEL" onPress={() => deleteClick()} />
          <ButtonApp title="%" onPress={() => handlePercentage()} />
          <ButtonApp
            title="/" onPress={() => operationClick('/')} />
        </View>
        <View style={styles.btnRow}>
          <ButtonApp title="7" onPress={() => numberClick('7')} />
          <ButtonApp title="8" onPress={() => numberClick('8')} />
          <ButtonApp title="9" onPress={() => numberClick('9')} />
          <ButtonApp title="X" onPress={() => operationClick('*')} />
        </View>
        <View style={styles.btnRow}>
          <ButtonApp title="4" onPress={() => numberClick('4')} />
          <ButtonApp title="5" onPress={() => numberClick('5')} />
          <ButtonApp title="6" onPress={() => numberClick('6')} />
          <ButtonApp title="-" onPress={() => operationClick('-')} />
        </View>
        <View style={styles.btnRow}>
          <ButtonApp title="1" onPress={() => numberClick('1')} />
          <ButtonApp title="2" onPress={() => numberClick('2')} />
          <ButtonApp title="3" onPress={() => numberClick('3')} />
          <ButtonApp title="+" onPress={() => operationClick('+')} />
        </View>
        <View style={styles.btnRow}>
          <ButtonApp title="0" onPress={() => numberClick('0')} />
          <ButtonApp title="00" onPress={() => numberClick('00')} />
          <ButtonApp title="." onPress={() => handlePoint()} />
          <ButtonApp title="=" onPress={() => equalsClick()} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 20,
  },
  DaskMode: {
    backgroundColor: '#050505',
  },
  LightMode: {
    backgroundColor: '#e0d3d3',
  },
  display: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  results: {
    fontWeight: 'bold',
    fontSize: 42,

  },
  query: {
    fontWeight: 'regular',
    fontSize: 38,

  },
  TextDask: {
    color: 'black',
  },
  TextLight: {
    color: '#fff',
  },
  keyboard: {
    flex: 7,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  image: {
    flex: 1,
    paddingTop: 25,
  }

});
