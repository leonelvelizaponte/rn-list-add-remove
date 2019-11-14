import React, {useState} from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';

//Here i import the components where are the Views wich UX
import GoalItem from './components/GoalItem.js';
import GoalInput from './components/GoalInput.js';

export default function App() {
  //with this one we could set the second variables with the first one
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    setCourseGoals(currentGoals => [...currentGoals, { id: Math.random().toString(), value: goalTitle}]);
    setIsAddMode(false);
  }

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  }

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  }

  //at return's you will show all visual structure
  return (
    //If you look deeper you can see the GoalInput & GoalItem tag where this App.js will have a binding
    //I use the keyExtractor to get  the keys which i called id, why? because when im creating a list i need a key to avoid the warning alert
    //FlatList is using by the app for load a long amount of itemlist, its like a infinity scroll, It call a portion for fast loading
    <View style={styles.screen}>
      <Button title="Add a new goal" onPress={() => setIsAddMode(true)}/>
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAdditionHandler}/>
      <FlatList 
        keyExtractor={(item,index) => item.id}
        data={courseGoals} 
        renderItem={itemData => <GoalItem id={itemData.item.id} onDelete={removeGoalHandler} title={itemData.item.value}/>}>
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  
});
