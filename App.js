import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  useWindowDimensions,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  const isIOS = Platform.OS === 'ios';

  const [text, setText] = useState(''); // Lưu giá trị văn bản
  const [darkMode, setDarkMode] = useState(false); // Lưu trạng thái sáng/tối

  useEffect(() => {
    StatusBar.setBarStyle(isPortrait ? 'dark-content' : 'light-content');
    StatusBar.setBackgroundColor(isPortrait ? (darkMode ? '#1c1c1c' : 'blue') : (darkMode ? '#333' : 'green'));
  }, [isPortrait, darkMode]);

  // Hàm xử lý khi nhấn nút Lưu
  const handleSave = () => {
    Alert.alert('Thông báo', 'Đã nhập thành công!', [{ text: 'OK' }]);
  };

  // Hàm xử lý khi nhấn nút Hủy
  const handleCancel = () => {
    Alert.alert(
      'Thông báo',
      'Bạn có muốn hủy nhập không?',
      [
        {
          text: 'Không',
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => setText(''), // Xóa văn bản nếu người dùng chọn "Có"
        },
      ]
    );
  };

  // Hàm chuyển đổi chế độ sáng/tối
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <KeyboardAvoidingView
      behavior={isIOS ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: darkMode ? '#1c1c1c' : '#f5f5f5' }]}
    >
      <TouchableOpacity
        onPress={toggleDarkMode} // Gọi hàm toggleDarkMode khi nhấn
        style={styles.toggleButton}
      >
        <Text style={styles.toggleButtonText}>
          {darkMode ? 'Chế Độ Sáng' : 'Chế Độ Tối'}
        </Text>
      </TouchableOpacity>

      <Image
        source={require('./assets/img/anh1.jpg')}
        style={{
          width: width * 0.8,
          height: isPortrait ? width * 0.8 * 0.5 : width * 0.4 * 0.5,
          marginBottom: 20,
        }}
        resizeMode="contain"
      />

      <TextInput
        style={[styles.input, { backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000' }]}
        placeholder="Nhập văn bản"
        placeholderTextColor={darkMode ? '#ccc' : '#999'}
        value={text}
        onChangeText={(inputText) => setText(inputText)} // Cập nhật giá trị văn bản
      />

      <View
        style={[
          styles.buttonContainer,
          {
            flexDirection: isPortrait ? 'column' : 'row',
          },
        ]}
      >
        <Button
          title="Hủy"
          onPress={handleCancel} // Gọi hàm handleCancel khi nhấn nút Hủy
          color="red"
          style={[
            styles.button,
            {
              width: isPortrait ? width * 0.8 : width / 2 - 40,
              margin: 40,
            },
          ]}
        />
        <Button
          title="Lưu"
          onPress={handleSave} // Gọi hàm handleSave khi nhấn nút Lưu
          color="blue"
          style={[
            styles.button,
            {
              width: isPortrait ? width * 0.8 : width / 2 - 40,
              margin: 50,
            },
          ]}
        />
      </View>

      <Text style={[styles.platformText, { color: darkMode ? '#fff' : Platform.OS === 'ios' ? 'blue' : 'green' }]}>
        Nền tảng: {isIOS ? 'iOS' : 'Android'}
      </Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Platform.select({
      ios: 20,
      android: 20,
    }),
  },
  toggleButton: {
    padding: 10,
    backgroundColor: '#00b9d6',
    borderRadius: 5,
    marginBottom: 20,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    height: 50,
    margin: 10,
  },
  platformText: {
    fontSize: 18,
    padding: 10,
  },
});

export default App;
