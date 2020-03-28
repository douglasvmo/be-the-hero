import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import style from './style';

function Details() {
  const navigate = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const message = `Olá ${
    incident.name
  }, estou entrando em contato pois gostaria de ajudar no caso '${
    incident.title
  }' com o valor de ${Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }).format(incident.value)}`;

  const navigateBack = () => navigate.goBack();

  const sendMail = () => {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  };
  const sendWhatsapp = () => {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    );
  };

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name='arrow-left' size={28} color='#e82041' />
        </TouchableOpacity>
      </View>

      <View style={style.incident}>
        <Text style={[style.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={style.incidentValue}>
          {incident.name} de {}
          {incident.city.charAt(0).toUpperCase() + incident.city.slice(1)}/
          {incident.uf.toUpperCase()}
        </Text>

        <Text style={style.incidentProperty}>CASO:</Text>
        <Text style={style.incidentValue}>{incident.description}</Text>

        <Text style={style.incidentProperty}>VALOR:</Text>
        <Text style={style.incidentValue}>
          {Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
          }).format(incident.value)}
        </Text>
      </View>

      <View style={style.contactBox}>
        <Text style={style.heroTitle}>Save o dia</Text>
        <Text style={style.heroTitle}>Seja o herói desse caso.</Text>
        <Text style={style.heroDescription}>Entre em contato</Text>
        <View style={style.actions}>
          <TouchableOpacity style={style.action} onPress={sendWhatsapp}>
            <Text style={style.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.action} onPress={sendMail}>
            <Text style={style.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Details;
