import Loader from "../../../components/Loader";
import React, { useEffect } from "react";
import { useComments } from "../hooks/useComments";
import { Text, View } from "../../../components/Themed";
import { FlatList, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { CategoryStackRoutesProps } from "infrastructure/router/interfaces";
import { CategoryStackRoutes } from "infrastructure/router/enums";
import Comment from "./Comment/Comment";
import { getInifiteScrollCallback } from "../../../helpers/getInfiniteScrollCallback";

interface ComponentProps {
  footer: JSX.Element;
}

const CommentsList = ({ footer }: ComponentProps) => {
  const { params } =
    useRoute<CategoryStackRoutesProps<CategoryStackRoutes.CategoryPost>>();
  const { isLoading, list, loadComments, updatePaging, paging } = useComments(
    params.categoryEntityId
  );

  useEffect(() => {
    loadComments();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <View style={styles.listStyle}>
      <FlatList
        style={styles.listStyle}
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={(comment) => <Comment comment={comment.item} />}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <Text>There are no comments yet</Text>
          </View>
        }
        contentContainerStyle={{
          flexGrow: 1,
          display: "flex",
          padding: 20,
        }}
        refreshing={isLoading}
        onEndReached={() => getInifiteScrollCallback(updatePaging, paging)}
        onEndReachedThreshold={0.1}
      />
      {footer}
    </View>
  );
};

export default CommentsList;

const styles = StyleSheet.create({
  listStyle: {
    shadowColor: "#000",
    elevation: 2,
    margin: 7,
    height: "60%",
  },
  emptyList: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    paddingVertical: 10,
  },
});