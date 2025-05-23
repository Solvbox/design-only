import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import { spacing, typography } from '@/config/theme';
import { useThemeColor } from '@/hooks/useThemeColor';

export interface NuggetCardInteractionProps {
  helpfulCount: number;
  commentCount: number;
  isHelpful: boolean;
  isSaved: boolean;
  onHelpfulPress?: () => void;
  onCommentPress?: () => void;
  onSharePress?: () => void;
  onSavePress?: () => void;
  hideCommentButton?: boolean;
}

/**
 * Interaktionskomponente für die NuggetCard
 * Zeigt interaktive Elemente wie Kommentieren, "Das hilft", Teilen und Speichern an.
 * Die Komponente verwendet Status-Informationen um den aktuellen Zustand (z.B. hilfreich,
 * gespeichert) visuell darzustellen und unterstützt Barrierefreiheit.
 * @param {object} props - Die Komponenteneigenschaften
 * @param {number} props.helpfulCount - Anzahl der "Hilfreich"-Markierungen
 * @param {number} props.commentCount - Anzahl der Kommentare
 * @param {boolean} props.isHelpful - Ob der aktuelle Benutzer das Nugget als hilfreich markiert hat
 * @param {boolean} props.isSaved - Ob der aktuelle Benutzer das Nugget gespeichert hat
 * @param {Function} [props.onHelpfulPress] - Callback bei Klick auf "Das hilft"
 * @param {Function} [props.onCommentPress] - Callback bei Klick auf Kommentieren
 * @param {Function} [props.onSharePress] - Callback bei Klick auf Teilen
 * @param {Function} [props.onSavePress] - Callback bei Klick auf Speichern
 * @param {boolean} [props.hideCommentButton] - Ob der Kommentar-Button ausgeblendet werden soll
 * @returns {React.ReactElement} Die gerenderte NuggetCardInteraction-Komponente
 */
export function NuggetCardInteraction({
  helpfulCount,
  commentCount,
  isHelpful,
  isSaved,
  onHelpfulPress,
  onCommentPress,
  onSharePress,
  onSavePress,
  hideCommentButton = false,
}: NuggetCardInteractionProps) {
  const colors = useThemeColor();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { borderTopColor: colors.divider }]}>
      <View style={styles.leftButtonsContainer}>
        {/* Kommentieren Button */}
        {!hideCommentButton && (
          <TouchableOpacity 
            style={styles.iconWithCountButton}
            onPress={onCommentPress}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`${commentCount > 0 ? commentCount : t('nugget.interaction.noComments')} ${t('nugget.interaction.comments')}`}
          >
            <Ionicons 
              name="chatbubble-outline" 
              size={20} 
              color={colors.textSecondary} 
            />
            <Text style={[styles.countText, { color: colors.textSecondary }]}>
              {commentCount > 0 ? commentCount : ''}
            </Text>
          </TouchableOpacity>
        )}

        {/* "Das hilft"-Button */}
        <TouchableOpacity 
          style={[styles.actionButton, hideCommentButton && { marginLeft: 0 }]}
          onPress={onHelpfulPress}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={isHelpful ? t('nugget.interaction.helpful') : t('nugget.interaction.markHelpful')}
          accessibilityState={{ selected: isHelpful }}
        >
          <MaterialCommunityIcons 
            name={isHelpful ? "thumb-up" : "thumb-up-outline"} 
            size={20} 
            color={isHelpful ? colors.primary : colors.textSecondary} 
          />
          <Text style={[
            styles.actionText, 
            { color: isHelpful ? colors.primary : colors.textSecondary }
          ]}>
            {t('nugget.interaction.thatHelps')} {helpfulCount > 0 ? `(${helpfulCount})` : ''}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rightButtonsContainer}>
        {/* Teilen Button */}
        <TouchableOpacity 
          style={styles.iconOnlyButton}
          onPress={onSharePress}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={t('nugget.interaction.share')}
        >
          <Ionicons 
            name="paper-plane-outline" 
            size={20} 
            color={colors.textSecondary}
            style={{ transform: [{ rotate: '20deg' }] }}
          />
        </TouchableOpacity>

        {/* Speichern Button */}
        <TouchableOpacity 
          style={styles.iconOnlyButton}
          onPress={onSavePress}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={isSaved ? t('profile.nuggetSaved') : t('nugget.interaction.save')}
          accessibilityState={{ selected: isSaved }}
        >
          <Ionicons 
            name={isSaved ? "bookmark" : "bookmark-outline"} 
            size={20} 
            color={isSaved ? colors.primary : colors.textSecondary} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderTopWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    marginLeft: spacing.m,
  },
  iconWithCountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  iconOnlyButton: {
    padding: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.l,
  },
  actionText: {
    fontSize: typography.fontSize.s,
    marginLeft: spacing.xs,
    fontWeight: typography.fontWeight.medium as TextStyle['fontWeight'],
  },
  countText: {
    fontSize: typography.fontSize.s,
    marginLeft: spacing.xxs,
    fontWeight: typography.fontWeight.medium as TextStyle['fontWeight'],
  },
}); 