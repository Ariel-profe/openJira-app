import React, { FC, useContext, useMemo, DragEvent } from 'react';

import { List, Paper } from '@mui/material';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import { EntryCard } from './EntryCard';
import { EntryStatus } from '../../interfaces';

import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus
};

export const EntryList:FC<Props> = ({status}) => {

    const {entries, updateEntry} = useContext(EntriesContext);
    const {isDragging, endDragging} = useContext(UIContext)
       
    const entriesByStatus = useMemo( () => entries.filter(entry => entry.status === status) , [entries, status]);

    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text');
        
        const entry = entries.find(entry => entry._id === id)!;

        entry.status = status;
        updateEntry(entry);
        endDragging();
    };

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };
    
  return (
    <div 
        onDrop={onDropEntry}
        onDragOver={allowDrop}
        className={isDragging ? styles.dragging : ''}
    >
        <Paper sx={{
                height: 'calc(100vh - 180px)', 
                overflow: 'scroll', 
                backgroundColor: 'transparent',
                padding: '1px 5px',
                '&::-webkit-scrollbar':{
                    width: 4
                },
                '&::-webkit-scrollbar-track':{
                    backgroundColor: 'transparent'
                },
                '&::-webkit-scrollbar-thumb':{
                    backgroundColor: 'gray',
                    borderRadius: 5
                },
                '&::-webkit-scrollbar-thumb:hover':{
                   background: '#b3b3b3'
                }
            }}>

           {/* { //Todo: cambiará si estoy haciendo drago o no}  */}
            <List sx={{
                opacity: isDragging ? .2 : 1 , 
                transition: 'all .3s' 
            }}>
                {
                    entriesByStatus.map(entry => (
                        <EntryCard key={entry._id} entry={entry} />
                    ) )
                }
            </List>
        </Paper>
    </div>
  )
}
