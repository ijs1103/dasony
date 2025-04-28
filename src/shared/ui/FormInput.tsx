import { Pressable, StyleSheet, Text, TextInput } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder: string;
  rules?: object;
  maxLength?: number;
  labelColor?: string;
  onPress?: () => void;
  editable?: boolean;
}

const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  rules,
  maxLength,
  labelColor,
  onPress,
  editable = true,
}: FormInputProps<T>) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {label && (
        <Text
          style={[
            styles.label,
            { color: labelColor ? labelColor : '#3C63B3' },
          ]}>
          {label}
        </Text>
      )}
      <Controller
        control={control}
        rules={rules}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              style={styles.textInput}
              placeholderTextColor={'#2752AB'}
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              maxLength={maxLength}
              editable={editable}
            />
            {error?.message && (
              <Text style={styles.errorMessage}>{error.message}</Text>
            )}
          </>
        )}
        name={name}
      />
    </Pressable>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
  },
  textInput: {
    borderColor: '#2752AB',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: '#000',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});
