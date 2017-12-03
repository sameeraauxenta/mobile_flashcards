import React from 'react';
import { 
    View, 
    Text, 
    AsyncStorage,
    Button,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import { connect } from 'react-redux';
import { getAllDecks } from '../../redux/actions/decks';

import { Entypo } from '@expo/vector-icons';
import { DECK_KEY } from '../../utils/helpers';
import Card from '../card/card';

const Cards = StackNavigator ({
    Card: {
        screen: Card
    }
})

class Decks extends React.Component {

    state = {
        decks: null
    }

    componentDidMount () {
        AsyncStorage.getItem(DECK_KEY).then((value) => {
            value? this.props.getAllDecks(JSON.parse(value)):null;
        }).done();
    }

    
    render () {

        const {decks} = this.props.decks;


        const deckItems = []
        
        Object.keys(decks).forEach((item, index)=> {
            deckItems.push({
                key: item,
                value: item
            })
        });


        console.log('deckItems', deckItems)

        const renderItems = ({item}) => {

            value = item.key
            
            return <View style={{height: 300}}>
                <TouchableOpacity>
                    <View>
                        <Text>{value}</Text>
                    </View>
                    <View>
                        <Text>
                            {decks[value].questions?decks[value].questions.map((question, index) => {
                                return <Text>{question}</Text>
                            }):null}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        }

        return (
            <View style={styles.container}>
                { 
                    Object.keys(decks).length
                        ?<FlatList data={deckItems} renderItem={renderItems}/>
                        :<View style={styles.noDecks}>
                            <Entypo name="emoji-sad" size={32}/>
                            <Text>No Decks Availables</Text>
                        </View>
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const { decks } = state;

    return {
        decks: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllDecks: (value) => {dispatch(getAllDecks(value))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Decks);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    noDecks: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
    