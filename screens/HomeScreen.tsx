import React, { useEffect, useState } from 'react';
import { ScrollView, Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Article = {
  title: string;
  source: { name: string };
  urlToImage?: string;
  description?: string;
  content?: string;
};

type RootStackParamList = {
  ArticleDetail: { article: Article };
  LiveTV: undefined;
};

const HomeScreen = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    axios
      .get(
        'https://newsapi.org/v2/everything?q=pakistan&sortBy=publishedAt&language=en&apiKey=d98b725fa0c74dc897cd195b51386392'
      )
      .then((res) => {
        const shuffled = res.data.articles.sort(() => 0.5 - Math.random());
        setArticles(shuffled.slice(0, 20));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <ScrollView>
      {/* Geo News Logo Header */}
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/en/8/8e/Geo_News_logo.png', // ✅ Use valid remote image URL
          }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Live TV Button */}
      <TouchableOpacity
        style={styles.liveButton}
        onPress={() => navigation.navigate('LiveTV')}
      >
        <Text style={styles.liveButtonText}>📺 Watch Geo News Live</Text>
      </TouchableOpacity>

      {/* Articles */}
      {articles.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate('ArticleDetail', { article: item })}
        >
          <Card style={{ margin: 10 }}>
            <Card.Cover
              source={{
                uri: item.urlToImage
                  ? item.urlToImage
                  : 'https://via.placeholder.com/400x200.png?text=No+Image',
              }}
            />
            <Card.Content>
              <Text variant="titleMedium">{item.title}</Text>
              <Text variant="bodySmall">{item.source.name}</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  logo: {
    width: 180,
    height: 60,
  },
  liveButton: {
    backgroundColor: '#d10000',
    padding: 12,
    borderRadius: 8,
    margin: 10,
    alignItems: 'center',
  },
  liveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
