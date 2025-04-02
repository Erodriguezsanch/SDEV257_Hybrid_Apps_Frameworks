import { Platform, StyleSheet, StatusBar } from 'react-native'; 

export default StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'lightyellow',
    alignItems:'center',
    justifyContent: 'space-around',

    ...Platform.select({
      ios: { paddingTop: 40 },
      android: { paddingTop: StatusBar.currentHeight }
    })
  },

  box: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderStyle: 'dashed',
    borderColor: 'navyblue',
    borderWidth: 2.5,
  },

  boxText: {
    fontWeight: 'bold',
    color: 'darkslategray',
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
  },

  column: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
  }
});