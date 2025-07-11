import React from 'react';
import { ScrollView, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useRoute, RouteProp } from '@react-navigation/native';

type Article = {
  urlToImage?: string;
  title: string;
  description?: string;
  content?: string;
};

type RootStackParamList = {
  ArticleDetail: { article: Article };
};

type ArticleDetailRouteProp = RouteProp<RootStackParamList, 'ArticleDetail'>;

const ArticleDetailScreen: React.FC = () => {
  const route = useRoute<ArticleDetailRouteProp>();
  const { article } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {article.urlToImage && (
        <Image source={{ uri: article.urlToImage }} style={styles.image} resizeMode="cover" />
      )}
      <Text variant="titleLarge" style={styles.title}>
        {article.title}
      </Text>
      <Text variant="bodyMedium" style={styles.description}>
        {article.description || article.content || 'No content available.'}
      </Text>
    </ScrollView>
  );
};

export default ArticleDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    lineHeight: 20,
  },
});
