import os 


def get_number_of_files(directory: str):
    """
    get number of files in a directory
    """

    number_of_files = len([item for item in os.listdir(directory) if os.path.isfile(os.path.join(directory, item))])
    print(number_of_files)
    return number_of_files

def get_amount_of_data(directory: str):
    """
    get size of data in gigabytes in a directory
    """
    size = sum([os.path.getsize(os.path.join(directory, item)) for item in os.listdir(directory) if os.path.isfile(os.path.join(directory, item))])
    print(size)
    return size

def get_info(path: str):
    pass