import React, { useEffect, useState } from 'react';
import { ScrollView, Image, TouchableOpacity, View, StyleSheet, SafeAreaView } from 'react-native';
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.customHeader}>
  {/* Burger Icon */}
  <TouchableOpacity onPress={() => console.log('Burger clicked')}>
    <Text style={styles.burger}>☰</Text>
  </TouchableOpacity>

  {/* Logo */}
  <Image
    source={require('../assets/geo_logo_transparent.png')} // ✅ use your transparent logo
    style={styles.headerLogo}
    resizeMode="contain"
  />

  {/* Urdu Label */}
  <TouchableOpacity onPress={() => console.log('Switch to Urdu')}>
    <Text style={styles.urduLabel}>اردو</Text>
  </TouchableOpacity>
</View>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Geo News Logo Header */}
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: 'https://your-image-url-or-remote-image.webp', // update this to a valid URL or local image
            }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

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

      {/* Footer Play Button */}
      {/* <View style={styles.footer}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => navigation.navigate('LiveTV')}
          activeOpacity={0.7}
        >
          <Text style={styles.playButtonText}>▶️ Watch Live TV</Text>
        </TouchableOpacity>
      </View> */}
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
    width: 180,
    height: 60,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  playButton: {
    backgroundColor: '#d10000',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
 customHeader: {
  
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 15,
  paddingTop:9, // More spacing from top
  backgroundColor: '#fff',
  elevation: 4,
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
},

burger: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#000',
},

headerLogo: {
  width: 250,    // ⬅️ increased width
  height: 100,    // ⬅️ increased height
},

urduLabel: {
  fontSize: 18,
  backgroundColor: '#007bff', // Bootstrap blue
  color: '#fff',
  fontWeight: 'bold',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 8,
  overflow: 'hidden',
},



});

export default HomeScreen;
