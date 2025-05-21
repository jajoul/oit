import json
import random
class RandomData():

    def __init__(self):
        #read json file
        with open("term/data.json", "r") as f:
            self.data =list(json.load(f))

    def get_random_data(self):
        cat=['vegetable','music_song','game_title','company_name','book_title','vehicle_model','lorem_word']
        random_data=''
        
        for r in range (2):
            id = random.randint(0, len(self.data) - 1)
            rand_cat = random.randint(0, len(cat) - 1)
            
            if r == 1:
                gen_data=f' ({self.data[id][cat[rand_cat]]})'
            else:
                gen_data=self.data[id][cat[rand_cat]]
            random_data+=gen_data

        return random_data

        