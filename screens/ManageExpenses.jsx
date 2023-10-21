import { View, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useContext, useState } from 'react'
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/Colors';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const ManageExpenses = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState()

  const expensesCtx = useContext(ExpensesContext)

  const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId)

  useLayoutEffect(() => {

    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : "Add Expense"
    })
  }, [navigation, isEditing])

  async function deleteExpnseHandler() {
    setIsSubmitting(true)
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId)
      navigation.goBack()
    } catch (error) {
      setError('Could not delete Expense')
      setIsSubmitting(false)
    }
  }

  function cancelHandler() {
    navigation.goBack()
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true)

    try {
      if (isEditing) {
        expensesCtx.updateExpense(
          editedExpenseId,
          expenseData
        );
        await updateExpense(editedExpenseId, expenseData)
      } else {
        const id = await storeExpense(expenseData)
        expensesCtx.addExpense({ ...expenseData, id: id })
      }
      navigation.goBack()
    } catch (error) {
      setError('could not save data , please try again')
      setIsSubmitting(false)
    }
  }

  if (isSubmitting) {
    return <LoadingOverlay />
  }

  function errorHandler() {
    setError(null)
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  return (
    <View style={styles.Container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />


      {isEditing &&
        <View style={styles.deletContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onpress={deleteExpnseHandler}
          />
        </View>
      }
    </View>
  )
}

export default ManageExpenses;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deletContainer: {
    marginTop: 15,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
})