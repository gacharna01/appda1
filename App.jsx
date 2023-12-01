import { StyleSheet, Text, View, TextInput, Button, FlatList, Modal } from 'react-native'
import { useState } from 'react'
import CustomModal from './components/CustomModal'
import CustomInput from './components/CustomInput'

export default function App() {
  const [textItem, setTextItem] = useState('')
  const [itemList, setItemList] = useState([])
  const [itemSelectedToDelete, setItemSelectedToDelete] = useState({})
  const [modalVisible, setModalVisible] = useState(false)

  const onChangeTextHandler = (text) => {
    setTextItem(text)
  }

  const addItemToList = () => {
    setItemList(prevState => [...prevState, { id: Math.random().toString(), value: textItem }])
    setTextItem('')
  }

  const onSelectItemHandler = (id) => {
    setModalVisible(!modalVisible)
    setItemSelectedToDelete(itemList.find((item) => item.id === id))
  }

  const onDeleteItemHandler = () => {
    setItemList(itemList.filter((item) => item.id !== itemSelectedToDelete.id))
    setModalVisible(!modalVisible)
  }

  const renderListItem = ({ item }) => (
    <View style={styles.itemList}>
      <Text>{item.value}</Text>
      <Button title="x" onPress={() => onSelectItemHandler(item.id)} />
    </View>
  )

    return (
      <>
        <View style={styles.container}>
          <CustomInput
            placeholderProp="Ingresa los productos"
            textItemProp={textItem}
            onChangeTextHandlerEvent={onChangeTextHandler}
            addItemToListEvent={addItemToList}
          />
          <FlatList
            data={itemList}
            renderItem={renderListItem}
            keyExtractor={item => item.id}
          />
        </View>
        <CustomModal
          animationTypeProp="slide"
          isVisibleProp={modalVisible}
          itemSelectedProp={itemSelectedToDelete}
          onDeleteItemHandlerEvent={onDeleteItemHandler}
          setModalVisibleEvent={setModalVisible}
        />
      </>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e5e5e5',
      padding: 30
    },
  
    itemList: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      margin: 10,
      backgroundColor: "#d9ed92",
      borderRadius: 10,
    },
  
  });