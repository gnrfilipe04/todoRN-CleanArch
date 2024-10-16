import { StyleSheet, Text } from "react-native"

interface TitlePageProps {
    text: string;
}

const TitlePage = (props: TitlePageProps) => {
    return (
        <Text style={styles.title}>
            {props.text}
        </Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default TitlePage