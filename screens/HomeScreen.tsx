import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { Text, Card } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Article = {
  id: number;
  title: string;
  description: string;
  image?: string;
  date?: string;
  url?: string;
  source: { name: string };
};

type RootStackParamList = {
  ArticleDetail: { article: Article };
  LiveTV: undefined;
};

const BASE_IMAGE_URL =
  'https://srv1915-files.hstgr.io/4d4fb51905eaf38e/files/public_html/images/';

const HomeScreen = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getImageUrl = (imageName?: string) => {
    if (!imageName) {
      return 'https://via.placeholder.com/400x200.png?text=No+Image';
    }
    if (imageName.startsWith('http')) {
      return imageName;
    }
    return BASE_IMAGE_URL + imageName;
  };

  useEffect(() => {
    axios
      .get('http://192.168.1.12/47news-api/get-posts.php')
      .then((res) => {
        if (res.data && res.data.articles) {
          const shuffled = res.data.articles.sort(() => 0.5 - Math.random());
          setArticles(shuffled.slice(0, 20));
        }
      })
      .catch((err) => console.error('API Error:', err));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {/* Top Header */}
      <View style={styles.customHeader}>
        <TouchableOpacity onPress={() => console.log('Burger clicked')}>
          <Text style={styles.burger}>☰</Text>
        </TouchableOpacity>

        <Image
          source={require('../assets/logo.png')}
          style={styles.headerLogo}
          resizeMode="contain"
        />

        <TouchableOpacity onPress={() => console.log('Switch to Urdu')}>
          <Text style={styles.urduLabel}>اردو</Text>
        </TouchableOpacity>
      </View>

      {/* Center Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://47news.tv/47logo.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* News Articles */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {articles.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate('ArticleDetail', { article: item })
            }
          >
            <Card style={styles.articleCard}>
              <Card.Cover
                source={{ uri: getImageUrl(item.image) }}
                style={{ height: 200 }}
              />
              <Card.Content>
                <Text variant="titleMedium" style={{ color: '#0d6a00' }}>
                  {item.title}
                </Text>
                <Text variant="bodySmall">{item.source.name}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Menu Bar */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('LiveTV')}
        >
          <Text style={styles.menuButtonText}>📺 Watch Live</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  logo: {
    width: 200,
    height: 50,
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 25,
    backgroundColor: '#0d6a00', // Green
    elevation: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  burger: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerLogo: {
    width: 180,
    height: 60,
  },
  urduLabel: {
    fontSize: 18,
    backgroundColor: 'white',
    color: '#0d6a00',
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
  articleCard: {
    margin: 10,
    backgroundColor: '#f8fff8', // very light green
    borderWidth: 1,
    borderColor: '#d6e9d6',
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0d6a00',
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  menuButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
