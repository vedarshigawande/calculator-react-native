import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Calculator extends React.Component {
constructor(){
  super()
  this.state = {
    resultText: '',
    output: ''
  }
  this.op = ['DEL','/','*','+','-']

}
  calculateResult = () =>  {
    t = this.state.resultText
    this.setState({
      output: eval(t)
    })
  }

  validateOperand = () => {
    text = this.state.resultText
    switch(text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
      return true
  }

  buttonPress = (text) => {
    if (text == '='){
      return this.validateOperand() && this.calculateResult()
    }
    this.setState({
      resultText: this.state.resultText+text
    })
  }
  operand = (text) => {
    switch (text)
    {
      case 'DEL' :
        temp = this.state.resultText.split('')
        temp.pop()
        this.setState({
          resultText: temp.join('')
        })
        break
      case '+':
      case '-':
      case '*':
      case '/':
        lastCh = this.state.resultText.split('').pop()
        if(this.op.indexOf(lastCh) > 0) return
        if(this.state.text == '') return
        this.setState({
          resultText: this.state.resultText + text
        })
    }
  }
  render () {
    let rows = []
    let nums = [[1,2,3],[4,5,6],[7,8,9],['.',0,'=']]
    for(let i=0; i<4 ; i++ )
    {
      row = []
      for(let j=0; j<3; j++)
      {
        row.push(
          <TouchableOpacity  style={styles.buttonStyle} onPress={()=> {this.buttonPress(nums[i][j])}}>
                  <Text style={styles.buttonText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        )
      }
    rows.push(<View style={styles.row}>{row}</View>)
    }

    let ops = []
    for(let i=0; i<5; i++ )
    {
        ops.push(
          <TouchableOpacity style={styles.calBut} onPress={() => {this.operand(this.op[i])}}>
                  <Text style={styles.opText}>{this.op[i]}</Text>
          </TouchableOpacity>
        )
    }
    
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculations}>
          <Text style={styles.calculationsText}>{this.state.output}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonNumber}>
            {rows}
          </View>
          <View style={styles.buttonOperation} >
            {ops}
          </View>
        </View>
      </View>
    )}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  opText: {
    fontSize: 30,
    color: 'white'
  },
  calBut: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  resultText: {
    fontSize: 20,
    color: 'black'
  },
  calculationsText: {
    fontSize: 30,
    color: 'black'
  },
  result: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  calculations : {
    flex: 1,
    backgroundColor: 'white',
    justifyContent:'center',
    alignItems: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexGrow: 6,
  },
  buttonNumber: {
    flex: 3,
    backgroundColor: '#434343',
  },
  buttonOperation: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#636363',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 30,
    color: 'white'
  },
});
