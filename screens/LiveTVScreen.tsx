import React, { useState, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function LiveTVScreen() {
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef<WebView>(null);

  const handleRefresh = () => {
    webViewRef.current?.reload();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📺 Geo News Live</Text>
        <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
          <Ionicons name="refresh" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* WebView */}
      <View style={styles.container}>
        {loading && (
          <ActivityIndicator
            size="large"
            color="#007bff"
            style={StyleSheet.absoluteFillObject}
          />
        )}
        <WebView
          ref={webViewRef}
          source={{ uri: 'https://live.geo.tv/' }}
          onLoadEnd={() => setLoading(false)}
          onError={(e) => {
            console.error('WebView error:', e.nativeEvent);
            setLoading(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', // dark header
  },
  header: {
    backgroundColor: '#d10000',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  refreshButton: {
    padding: 6,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
