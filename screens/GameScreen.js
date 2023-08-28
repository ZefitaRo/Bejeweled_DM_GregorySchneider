import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ImageBackground, Button} from 'react-native';
import { BejeweledBackgroundImage } from "../tools/theme";


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

export default class GameScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // Initialisation de l'état du jeu
            gridData: this.generateGrid(),
            score: 0,
            selectedFruit: null,
            remainingTime: 10, // 2 minutes en secondes
            isPaused: false,
            isGameOver: false,
            bestScores: [],
        };
    }

    componentDidMount() {
        this.startTimer(); // Lance le minuteur lorsque le composant est monté
    }

    // Fonction pour générer la grille de jeu avec des images de fruits aléatoires
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

    // Fonction pour échanger la position de deux fruits dans la grille
    swapFruits = (row1, col1, row2, col2) => {
        const gridCopy = JSON.parse(JSON.stringify(this.state.gridData));
        const temp = gridCopy[row1][col1];
        gridCopy[row1][col1] = gridCopy[row2][col2];
        gridCopy[row2][col2] = temp;
        this.setState({ gridData: gridCopy });
    };

    // Fonction pour vérifier les alignements horizontaux et verticaux
    checkAlignments = () => {
        const { gridData } = this.state;
        let newScore = this.state.score;
        const alignments = [];

        // Vérification des alignements horizontaux
        for (let i = 0; i < gridData.length; i++) {
            let count = 1;
            const currentAlignment = [];

            for (let j = 1; j < gridData[i].length; j++) {
                if (gridData[i][j].image === gridData[i][j - 1].image) {
                    count++;
                    if (count >= 3) {
                        if (count === 3) newScore += 100;
                        else if (count === 4) newScore += 300;
                        else if (count >= 5) newScore += 1000;

                        // Ajouter les cellules à l'alignement
                        currentAlignment.push({ row: i, col: j - count + 1 });
                    }
                } else {
                    count = 1;
                }
            }

            // Ajouter l'alignement courant à la liste des alignements
            if (currentAlignment.length >= 3) {
                alignments.push(currentAlignment);
            }
        }

        // Vérification des alignements verticaux
        for (let j = 0; j < gridData[0].length; j++) {
            let count = 1;
            const currentAlignment = [];

            for (let i = 1; i < gridData.length; i++) {
                if (gridData[i][j].image === gridData[i - 1][j].image) {
                    count++;
                    if (count >= 3) {
                        if (count === 3) newScore += 100;
                        else if (count === 4) newScore += 300;
                        else if (count >= 5) newScore += 1000;

                        // Ajouter les cellules à l'alignement
                        currentAlignment.push({ row: i - count + 1, col: j });
                    }
                } else {
                    count = 1;
                }
            }

            // Ajouter l'alignement courant à la liste des alignements
            if (currentAlignment.length > 0) {
                alignments.push(currentAlignment);
            }
        }

        this.setState({ score: newScore });
        return alignments;
    };

    // Gère l'interaction lorsque l'utilisateur appuie sur un fruit
    handleFruitPress = (row, col) => {
        const { gridData, selectedFruit, isPaused, remainingTime } = this.state;

        if (remainingTime > 0 && !isPaused) {
            if (selectedFruit === null) {
                // Aucun fruit n'est actuellement sélectionné
                this.setState({ selectedFruit: { row, col } });
            } else {
                // Un fruit est déjà sélectionné, on l'échange avec le fruit actuel
                const isAdjacent = Math.abs(selectedFruit.row - row) === 1 && selectedFruit.col === col ||
                    Math.abs(selectedFruit.col - col) === 1 && selectedFruit.row === row;

                if (isAdjacent) {
                    this.swapFruits(row, col, selectedFruit.row, selectedFruit.col);

                    // Vérifier si la permutation forme des alignements
                    const alignments = this.checkAlignments();

                    if (alignments.length > 0) {
                        // Supprimer les alignements et décaler les images vers le bas
                        console.log("je dois supprimer et décaler les images vers le bas");
                        this.removeAlignments(alignments);
                        console.log("j'ai supprimé et décalé");
                    } else {
                        // Annuler la permutation si elle ne forme pas d'alignements
                        this.swapFruits(row, col, selectedFruit.row, selectedFruit.col);
                    }

                    this.setState({ selectedFruit: null });
                }
            }
        }
    };

    // Fonction pour supprimer les alignements valides et mettre à jour la grille
    removeAlignments = (alignments) => {
        console.log("je suis dans removeAlignements");
        const gridCopy = JSON.parse(JSON.stringify(this.state.gridData));
        console.log("j'ai copié la grille");
        alignments.forEach(align => {
            align.forEach(cell => {
                gridCopy[cell.row][cell.col] = { image: null, selected: false };
            });

            // Supprimer les alignements horizontaux
            for (let i = align[0].row; i >= 0; i--) {
                if (gridCopy[i][align[0].col].image === null) {
                    break;
                }

                gridCopy[i][align[0].col] = { image: null, selected: false };
            }

            // Remplir les cases du haut avec de nouvelles images aléatoires
            for (let i = 0; i < align.length; i++) {
                const randomIndex = Math.floor(Math.random() * fruitsImages.length);
                gridCopy[i][align[0].col] = { image: fruitsImages[randomIndex], selected: false };
            }

            // Décaler les images vers le bas
            for (let i = align[0].row - 1; i >= 0; i--) {
                gridCopy[i + align.length] = gridCopy[i].map(cell => ({ ...cell }));
            }
        });

        this.setState({ gridData: gridCopy }, () => {
            // Vérifier si de nouveaux alignements se sont formés après les modifications
            const newAlignments = this.checkAlignments();

            if (newAlignments.length > 0) {
                // Supprimer les nouveaux alignements et décaler les images vers le bas à nouveau
                this.removeAlignments(newAlignments);
            }
        });
    };

    // Démarrer le minuteur qui diminue le temps restant
    startTimer = () => {
        this.timerInterval = setInterval(() => {
            if (!this.state.isPaused) {
                this.setState(prevState => ({
                    remainingTime: prevState.remainingTime - 1
                }), () => {
                    if (this.state.remainingTime <= 0) {
                        clearInterval(this.timerInterval);
                        // Appel à la fonction pour gérer la fin du jeu ici
                        this.handleGameOver();
                    }
                });
            }
        }, 1000); // Update every second
    };

    // Réinitialiser l'état du jeu pour commencer une nouvelle partie
    handleNewGame = () => {
        this.setState({
            gridData: this.generateGrid(),
            score: 0,
            selectedFruit: null,
            isGameOver: false,
            remainingTime: 10, // Reset the timer
            },
            () => {
                this.startTimer(); // Start the timer for the new game
            }
        );
    };

    // Mettre en pause ou reprendre le jeu
    handlePausePress = () => {
        // Mettre en pause ou reprendre le jeu
        this.setState((prevState) => ({
            isPaused: !prevState.isPaused,
        }));
    };

    // Gérer la fin du jeu en affichant le score final et les meilleurs scores
    handleGameOver = () => {
        clearInterval(this.timerInterval);

        // Ajouter le score actuel à la liste des meilleurs scores
        const newBestScores = [...this.state.bestScores, this.state.score];

        // Triez les meilleurs scores par ordre décroissant
        newBestScores.sort((a, b) => b - a);

        // Limitez le tableau à 3 meilleurs scores
        const limitedBestScores = newBestScores.slice(0, 3);

        this.setState({
            bestScores: limitedBestScores,
            isGameOver: true,
        });
    };

    render() {
        const { isPaused, remainingTime } = this.state;

        return (
            <View style={styles.container}>
                <ImageBackground source={BejeweledBackgroundImage} resizeMode = "cover" style = {styles.background}>

                    <View style={styles.newGameContainer}>
                        <Button title="New Game" onPress={this.handleNewGame} disabled={isPaused} />
                    </View>

                    <View style={styles.PauseContainer}>
                        <Button title={this.state.isPaused ? "Resume" : "Pause"} onPress={this.handlePausePress} />
                    </View>

                    <Text style={styles.scoreText}>Score: {this.state.score}</Text>

                    <Text style={styles.timerText}>Time left: {Math.floor(remainingTime / 60)}:{remainingTime % 60 < 10 ? '0' : ''}{remainingTime % 60}</Text>

                    <View style={styles.gridContainer}>
                        {this.state.gridData.map((row, rowIndex) => (
                            <View key={rowIndex} style={styles.row}>
                                {row.map((fruit, columnIndex) => (
                                    <TouchableOpacity
                                        key={columnIndex}
                                        onPress={() => this.handleFruitPress(rowIndex, columnIndex)}
                                        disabled={this.state.remainingTime <= 0} // Désactiver les interactions si le temps est écoulé
                                    >
                                        <Image
                                            source={fruit.image}
                                            style={[
                                                styles.fruits,
                                                { width: imageWidth, height: imageWidth, borderWidth: fruit.selected ? 2 : 0, borderColor: 'blue', opacity: isPaused ? 0 : 1 },
                                            ]}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))}
                    </View>

                    {this.state.isGameOver && (
                        <View style={styles.gameOverBanner}>
                            <Text style={styles.gameOverText}>Partie terminée</Text>

                            <Text></Text>

                            <Text style={styles.gameOverScoreText}>Votre score est de {this.state.score}</Text>

                            <Text></Text>

                            <Text style={styles.gameOverBestScores}>Meilleurs scores :</Text>
                            {this.state.bestScores.map((score, index) => (
                                <Text key={index} style={styles.bestScore}>
                                    {index + 1}. {score}
                                </Text>
                            ))}

                            <View style={styles.newGameContainer}>
                                <Button title="NEW GAME" onPress={this.handleNewGame} />
                            </View>
                        </View>
                    )}

                </ImageBackground>
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
        marginTop: 10,
    },

    row: {
        flexDirection: 'row',
    },

    fruits: {
        margin: 1,
    },

    scoreText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },

    newGameContainer: {
        marginBottom: 10,
        marginTop: 30,
        alignSelf: 'center',
        width: 150,
    },

    PauseContainer: {
        marginBottom: 10,
        marginTop: 30,
        alignSelf: 'center',
        width: 150,
    },

    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },

    timerText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },

    gameOverBanner: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%', // Occupe toute la largeur de l'écran
        height: '100%', // Occupe toute la hauteur de l'écran
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    gameOverText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },

    gameOverScoreText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },

    gameOverBestScores: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },

    bestScore: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',


    },
});