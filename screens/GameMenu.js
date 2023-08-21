import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity, ImageBackground} from 'react-native';

// Obtient la largeur de l'écran pour calculer la taille des images et l'espace autour de la grille
const screenWidth = Dimensions.get('window').width;

// Calcule la largeur souhaitée pour chaque image dans la grille
const imageWidth = (screenWidth - 20) / 8; // 20 pour la marge totale des images (2 * 8 images + 2 marges)

// Tableau des chemins vers les images de fruits
const fruitsImages = [
    require('../assets/images/Square_fruits/citron.png'),
    require('../assets/images/Square_fruits/citron_vert.png'),
    require('../assets/images/Square_fruits/pasteque.png'),
    require('../assets/images/Square_fruits/pamplemousse.png'),
    require('../assets/images/Square_fruits/amande.png'),
    require('../assets/images/Square_fruits/papaye.png'),
    require('../assets/images/Square_fruits/coco.png'),
];

export default class GameMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridData: this.generateGrid(),
            score: 0,
            selectedFruit: null, // Nouvel état pour suivre la position du fruit sélectionné
        };
    }

    generateGrid = () => {
        const grid = [];
        for (let i = 0; i < 8; i++) {
            const row = [];
            for (let j = 0; j < 8; j++) {
                const randomIndex = Math.floor(Math.random() * fruitsImages.length);
                row.push({ image: fruitsImages[randomIndex], selected: false });
            }
            grid.push(row);
        }
        return grid;
    };

    swapFruits = (row1, col1, row2, col2) => {
        const gridCopy = JSON.parse(JSON.stringify(this.state.gridData));
        const temp = gridCopy[row1][col1];
        gridCopy[row1][col1] = gridCopy[row2][col2];
        gridCopy[row2][col2] = temp;
        this.setState({ gridData: gridCopy });
    };

    checkAlignments = () => {
        const { gridData } = this.state;
        let newScore = this.state.score;

        for (let i = 0; i < gridData.length; i++) {
            let count = 1;
            for (let j = 1; j < gridData[i].length; j++) {
                if (gridData[i][j].image === gridData[i][j - 1].image) {
                    count++;
                    if (count >= 3) {
                        newScore += count * 100;
                    }
                } else {
                    count = 1;
                }
            }
        }

        for (let j = 0; j < gridData[0].length; j++) {
            let count = 1;
            for (let i = 1; i < gridData.length; i++) {
                if (gridData[i][j].image === gridData[i - 1][j].image) {
                    count++;
                    if (count >= 3) {
                        newScore += count * 100;
                    }
                } else {
                    count = 1;
                }
            }
        }

        this.setState({ score: newScore });
    };

    handleFruitPress = (row, col) => {
        const { gridData, selectedFruit } = this.state;

        if (selectedFruit === null) {
            // Aucun fruit n'est actuellement sélectionné
            this.setState({ selectedFruit: { row, col } });
        } else {
            // Un fruit est déjà sélectionné, on l'échange avec le fruit actuel
            this.swapFruits(row, col, selectedFruit.row, selectedFruit.col);
            this.setState({ selectedFruit: null }, () => {
                this.checkAlignments(); // Vérifie les alignements après l'échange
            });
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.gridContainer}>
                    {this.state.gridData.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.row}>
                            {row.map((fruit, columnIndex) => (
                                <TouchableOpacity
                                    key={columnIndex}
                                    onPress={() => this.handleFruitPress(rowIndex, columnIndex)}
                                >
                                    <Image
                                        source={fruit.image}
                                        style={[
                                            styles.fruits,
                                            { width: imageWidth, height: imageWidth, borderWidth: fruit.selected ? 2 : 0, borderColor: 'blue' },
                                        ]}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridContainer: {
        marginLeft: 10,
        marginRight: 10,
    },
    row: {
        flexDirection: 'row',
    },
    fruits: {
        margin: 1,
    },
});