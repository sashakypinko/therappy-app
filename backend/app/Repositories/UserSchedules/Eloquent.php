<?php

namespace App\Repositories\UserSchedules;

use App\Models\UserSchedule;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class Eloquent implements UserSchedulesRepository
{
	/**
	 * User Model
	 *
	 * @var UserSchedule
	 */
	protected UserSchedule $model;

    /**
     * Initialize Attributes
     *
     * @param UserSchedule $model
     */
    public function __construct(UserSchedule $model)
	{
		$this->model = $model;
	}

    /**
     * @param $id
     * @return Collection|Model
     */
	public function byId($id): Model|Collection
    {
        return $this->model->findOrFail($id);
	}

    /**
     * @param $id
     * @return mixed
     */
    public function byUserId($id): mixed
    {
        return $this->model->where('user_id', $id)->get();
    }

	/**
	 * Stores a resource.
	 *
	 * @param  array $attributes
	 * @return UserSchedule
     */
	public function store(array $attributes): UserSchedule
    {
        $schedule = clone $this->model;
        $schedule->fill($attributes);
        $schedule->save();

		return $schedule;
	}

    /**
     * Updates the Resource
     *
     * @param array $attributes
     * @param  $id
     * @return Collection|Model
     */
    public function update(array $attributes, $id): Model|Collection
    {
        $schedule = $this->byId($id);
        $schedule->fill($attributes);
        $schedule->save();

        return $schedule;
    }

    /**
     * Updates the Resource
     *
     * @param array $schedule
     * @param $userId
     * @return array
     */
    public function updateByUser(array $schedule, $userId): array
    {
        $this->clearSchedule($userId);

        $schedule = $this->formatScheduleForDb($schedule, $userId);
        foreach($schedule as $item){
            $this->store($item);
        }

        return $this->formatScheduleForWeb($this->byUserId($userId)->toArray());
     }

    protected function clearSchedule($userId)
    {
        $schedule = $this->byUserId($userId);
        $schedule = $schedule ?? [];
        foreach($schedule as $item){
            $item->delete();
        }
    }

    /**
     * Destroy a resource.
     *
     * @param  $id
     */
	public function destroy($id)
    {
        $schedule = $this->byId($id);
        $schedule->delete();
	}

    public function formatScheduleForWeb(array $schedule): array
    {
        $formattedSchedule = [];
        foreach($schedule as $item){
            $formattedSchedule[$item['day']][] = ['start' => $item['start'], 'end' => $item['end']];
        }

        return $formattedSchedule;
    }

    public function formatScheduleForDb(array $schedule, $userId): array
    {
        $formattedSchedule = [];
        foreach($schedule as $dayKey => $day){
            foreach($day as $item){
                $formattedSchedule[] = ['user_id' => $userId, 'day'=> $dayKey, 'start' => $item['start'], 'end' => $item['end']];
            }
        }

        return $formattedSchedule;
    }

}
