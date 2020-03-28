import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import style from './style';
import logoImg from '../../assets/logo.png';

function Incidents() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState();

  const loandIncidents = () => {
    if (loading || (total > 0 && data.length === total)) {
      return;
    }
    setLoading(true);
    api
      .get('incidents', {
        params: { page }
      })
      .then(response => {
        setData([...data, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
      });
  };

  useEffect(() => {
    loandIncidents();
  }, []);

  const navigationToDetails = incident => {
    navigation.navigate('DETAILS', { incident });
  };
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Image source={logoImg} />
        <Text style={style.headerText}>
          Total de <Text style={style.headerTextBold}>{total} casos</Text>
        </Text>
      </View>

      <View>
        <Text style={style.title}>Bem-Vindo</Text>
        <Text style={style.description}>
          Escolha um dos casos a baixo e salve o dia
        </Text>
      </View>

      <FlatList
        data={data}
        style={style.incidentList}
        extraData
        keyExtractor={item => item.id.toString()}
        // showsVerticalScrollIndicator={false}
        onEndReached={loandIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item }) => (
          <View style={style.incident}>
            <Text style={style.incidentProperty}>ONG:</Text>
            <Text style={style.incidentValue}>{item.name}</Text>

            <Text style={style.incidentProperty}>CASO:</Text>
            <Text style={style.incidentValue}>{item.description}</Text>

            <Text style={style.incidentProperty}>VALOR:</Text>
            <Text style={style.incidentValue}>
              {Intl.NumberFormat('pt-br', {
                style: 'currency',
                currency: 'BRL'
              }).format(item.value)}
            </Text>
            <TouchableOpacity
              style={style.detailsButton}
              onPress={() => navigationToDetails(item)}
            >
              <Text style={style.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name='arrow-right' size={16} color='#e02041' />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default Incidents;
