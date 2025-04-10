import { StyleSheet } from 'react-native';

const color = {
  background: 'lightyellow',
  primary: 'lightblue',
  secondary: 'lightgreen',
  text: 'black'
}

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
    },
    tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    items: {
        marginTop: 30,
    },
    item: {
        backgroundColor: color.primary,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: color.secondary,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',

    },
    circular: {
        width: 12,
        height: 12,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: color.secondary,
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        borderRadius: 60,
        borderColor: 'lightgrey',
        borderWidth: 1,
        width: 250,
        color: color.text,
    },
        addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: 'white',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'lightgrey',
        borderWidth: 1,
    },
    addText: {
      color: color.text,

    },


})